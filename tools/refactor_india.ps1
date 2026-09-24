$paths = "src", "config", "server"
$extensions = "*.js", "*.mjs", "*.json", "*.md"
$paths | ForEach-Object {
    Get-ChildItem -Path $_ -Recurse -Include $extensions | ForEach-Object {
        $content = Get-Content $_.FullName -Raw
        if ($null -ne $content) {
            $newContent = $content -creplace '\baustin\b', 'delhi' `
                                   -creplace '\bAustin\b', 'New Delhi' `
                                   -creplace '\bAUSTIN\b', 'DELHI' `
                                   -replace 'United States', 'India' `
                                   -replace "country: 'US'", "country: 'IN'" `
                                   -replace "countryCode: 'US'", "countryCode: 'IN'"
            if ($content -cne $newContent) {
                Set-Content -Path $_.FullName -Value $newContent -NoNewline
                Write-Host "Updated: $($_.FullName)"
            }
        }
    }
}
