$port = 5173
$distPath = Join-Path $PSScriptRoot "..\dist"
$distPath = (Resolve-Path $distPath).Path

if (-not (Test-Path $distPath)) {
    Write-Host "错误: 未找到 dist 目录，请先执行打包!" -ForegroundColor Red
    pause
    exit
}

# 寻找可用端口
while ($true) {
    try {
        $listener = New-Object System.Net.HttpListener
        $listener.Prefixes.Add("http://localhost:$port/")
        $listener.Start()
        break
    } catch {
        $port++
        if ($port -gt 5200) {
            Write-Host "无法绑定本地端口" -ForegroundColor Red
            exit
        }
    }
}

$url = "http://localhost:$port/"
Write-Host "=================================================" -ForegroundColor Green
Write-Host "   福帮帮 (CampusLink) 前端本地预览服务已启动!" -ForegroundColor Green
Write-Host "   访问地址: $url" -ForegroundColor Yellow
Write-Host "   提示: 保持本窗口打开即可持续预览，关闭窗口退出服务。" -ForegroundColor Gray
Write-Host "=================================================" -ForegroundColor Green

# 自动在默认浏览器中打开页面
Start-Process $url

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $relPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($relPath)) {
            $relPath = "index.html"
        }

        $filePath = Join-Path $distPath $relPath

        # 处理 SPA 前端路由 fallback (如果请求的文件不存在且无扩展名，则返回 index.html)
        if (-not (Test-Path $filePath) -and -not [System.IO.Path]::HasExtension($relPath)) {
            $filePath = Join-Path $distPath "index.html"
        }

        if (Test-Path $filePath) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                ".png"  { $response.ContentType = "image/png" }
                ".jpg"  { $response.ContentType = "image/jpeg" }
                ".jpeg" { $response.ContentType = "image/jpeg" }
                ".svg"  { $response.ContentType = "image/svg+xml" }
                ".ico"  { $response.ContentType = "image/x-icon" }
                ".json" { $response.ContentType = "application/json" }
                default { $response.ContentType = "application/octet-stream" }
            }

            try {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } catch {
                $response.StatusCode = 500
            }
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
