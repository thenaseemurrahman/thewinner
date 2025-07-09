# PowerShell script to restore useWooCommerce.ts
$source = "src\hooks\useWooCommerce.new.ts"
$destination = "src\hooks\useWooCommerce.ts"

if (Test-Path $source) {
    Copy-Item -Path $source -Destination $destination -Force
    Write-Host "✅ Successfully restored useWooCommerce.ts"
} else {
    Write-Host "❌ Source file not found: $source"
}
