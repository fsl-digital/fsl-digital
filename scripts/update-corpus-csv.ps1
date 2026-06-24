param(
    [string]$WorkbookPath = "public/uploads/corpus/corpus.xlsx",
    [string]$CsvPath = "public/uploads/corpus/corpus.csv"
)

$ErrorActionPreference = "Stop"

function Read-ZipText {
    param(
        [System.IO.Compression.ZipArchive]$Archive,
        [string]$EntryName
    )

    $entry = $Archive.GetEntry($EntryName)
    if (-not $entry) {
        throw "Missing XLSX entry: $EntryName"
    }

    $reader = [System.IO.StreamReader]::new($entry.Open())
    try {
        return $reader.ReadToEnd()
    }
    finally {
        $reader.Dispose()
    }
}

function Get-ColumnIndex {
    param([string]$CellReference)

    $letters = $CellReference -replace '[^A-Z]', ''
    $index = 0
    foreach ($letter in $letters.ToCharArray()) {
        $index = ($index * 26) + ([int]$letter - [int][char]'A' + 1)
    }
    return $index - 1
}

function Quote-CsvField {
    param([AllowEmptyString()][string]$Value)
    return '"' + ($Value -replace '"', '""') + '"'
}

$resolvedWorkbook = (Resolve-Path $WorkbookPath).Path
$archive = [System.IO.Compression.ZipFile]::OpenRead($resolvedWorkbook)

try {
    [xml]$sharedStringsXml = Read-ZipText $archive "xl/sharedStrings.xml"
    [xml]$sheetXml = Read-ZipText $archive "xl/worksheets/sheet1.xml"
    [xml]$relationshipsXml = Read-ZipText $archive "xl/worksheets/_rels/sheet1.xml.rels"

    # InnerText covers both plain <si><t> values and rich-text <si><r><t> runs.
    $sharedStrings = @(
        foreach ($item in $sharedStringsXml.sst.si) {
            $item.InnerText
        }
    )

    $relationshipTargets = @{}
    foreach ($relationship in $relationshipsXml.Relationships.Relationship) {
        $relationshipTargets[[string]$relationship.Id] = [string]$relationship.Target
    }

    $hyperlinks = @{}
    foreach ($hyperlink in $sheetXml.worksheet.hyperlinks.hyperlink) {
        $relationshipId = [string]$hyperlink.'r:id'
        if ($relationshipId -and $relationshipTargets.ContainsKey($relationshipId)) {
            $hyperlinks[[string]$hyperlink.ref] = $relationshipTargets[$relationshipId]
        }
    }

    $lines = [System.Collections.Generic.List[string]]::new()
    foreach ($row in $sheetXml.worksheet.sheetData.row) {
        $values = [string[]]::new(6)

        foreach ($cell in $row.c) {
            $reference = [string]$cell.r
            $columnIndex = Get-ColumnIndex $reference
            if ($columnIndex -lt 0 -or $columnIndex -ge $values.Length) {
                continue
            }

            $value = [string]$cell.v
            if ([string]$cell.t -eq 's' -and $value -ne '') {
                $value = $sharedStrings[[int]$value]
            }
            elseif ([string]$cell.t -eq 'inlineStr') {
                $value = [string]$cell.is.t
            }

            if ($columnIndex -eq 5 -and $hyperlinks.ContainsKey($reference)) {
                $value = $hyperlinks[$reference]
            }

            # Excel may serialize whole publication years as decimal numbers.
            if ($columnIndex -eq 3 -and $value -match '^(-?\d+)\.0+$') {
                $value = $Matches[1]
            }

            $values[$columnIndex] = $value
        }

        if ($values | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }) {
            $lines.Add((($values | ForEach-Object { Quote-CsvField $_ }) -join ','))
        }
    }

    $utf8WithoutBom = [System.Text.UTF8Encoding]::new($false)
    [System.IO.File]::WriteAllLines(
        (Join-Path (Get-Location) $CsvPath),
        $lines,
        $utf8WithoutBom
    )
}
finally {
    $archive.Dispose()
}

Write-Output "Updated $CsvPath from $WorkbookPath"
