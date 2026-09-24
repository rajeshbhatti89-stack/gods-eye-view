$paths = "src", "config", "server"
$extensions = "*.js", "*.mjs", "*.json", "*.md"

$replacements = @(
    @('\bsf\b', 'mumbai'),
    @('\bSan Francisco\b', 'Mumbai'),
    @('\bnyc\b', 'bangalore'),
    @('\bNew York\b', 'Bangalore'),
    @('\btokyo\b', 'kolkata'),
    @('\bTokyo\b', 'Kolkata'),
    @('\blondon\b', 'chennai'),
    @('\bLondon\b', 'Chennai'),
    @('\bparis\b', 'kolkata'),
    @('\bParis\b', 'Kolkata'),
    @('\bdubai\b', 'mumbai'),
    @('\bDubai\b', 'Mumbai'),
    @('\bdc\b', 'delhi'),
    @('\btallinn\b', 'delhi'),
    @('\bTallinn\b', 'Delhi')
)

$paths | ForEach-Object {
    Get-ChildItem -Path $_ -Recurse -Include $extensions | ForEach-Object {
        $content = Get-Content $_.FullName -Raw
        if ($null -ne $content) {
            $newContent = $content
            foreach ($pair in $replacements) {
                $newContent = $newContent -creplace $pair[0], $pair[1]
            }
            if ($content -cne $newContent) {
                Set-Content -Path $_.FullName -Value $newContent -NoNewline
                Write-Host "Updated: $($_.FullName)"
            }
        }
    }
}
