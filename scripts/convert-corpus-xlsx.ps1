param(
  [string]$InputPath = "public/uploads/corpus/corpus.xlsx",
  [string]$OutputPath = "public/uploads/corpus/corpus.csv"
)

Add-Type -AssemblyName System.IO.Compression.FileSystem

$resolvedInput = (Resolve-Path -LiteralPath $InputPath).Path
$archive = [System.IO.Compression.ZipFile]::OpenRead($resolvedInput)

try {
  function Read-ZipXml([string]$entryName) {
    $entry = $archive.GetEntry($entryName)
    if (-not $entry) { throw "Missing XLSX entry: $entryName" }
    $reader = [System.IO.StreamReader]::new($entry.Open())
    try { return [xml]$reader.ReadToEnd() } finally { $reader.Dispose() }
  }

  $sharedStrings = @()
  $sharedEntry = $archive.GetEntry('xl/sharedStrings.xml')
  if ($sharedEntry) {
    $reader = [System.IO.StreamReader]::new($sharedEntry.Open())
    try { $sharedXml = [xml]$reader.ReadToEnd() } finally { $reader.Dispose() }
    $sharedStrings = @($sharedXml.sst.si | ForEach-Object {
      if ($_.t -is [string]) { $_.t }
      elseif ($_.t.'#text') { $_.t.'#text' }
      else { (@($_.r | ForEach-Object { $_.t.'#text' }) -join '') }
    })
  }

  $workbook = Read-ZipXml 'xl/workbook.xml'
  $relations = Read-ZipXml 'xl/_rels/workbook.xml.rels'
  $firstSheet = @($workbook.workbook.sheets.sheet)[0]
  $relationshipId = $firstSheet.GetAttribute('id', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships')
  $relationship = @($relations.Relationships.Relationship) | Where-Object { $_.Id -eq $relationshipId } | Select-Object -First 1
  $target = $relationship.Target.TrimStart('/')
  $sheetEntry = if ($target.StartsWith('xl/')) { $target } else { "xl/$target" }
  $sheet = Read-ZipXml $sheetEntry

  function Get-ColumnIndex([string]$reference) {
    $letters = $reference -replace '[^A-Z]', ''
    $index = 0
    foreach ($character in $letters.ToCharArray()) {
      $index = ($index * 26) + ([int]$character - [int][char]'A' + 1)
    }
    return $index - 1
  }

  $rows = @($sheet.worksheet.sheetData.row)
  $maxColumn = 0
  foreach ($row in $rows) {
    foreach ($cell in @($row.c)) {
      $maxColumn = [Math]::Max($maxColumn, (Get-ColumnIndex $cell.r))
    }
  }

  $csvRows = foreach ($row in $rows) {
    $values = [string[]]::new($maxColumn + 1)
    foreach ($cell in @($row.c)) {
      $value = if ($cell.t -eq 's') {
        $sharedStrings[[int]$cell.v]
      } elseif ($cell.t -eq 'inlineStr') {
        if ($cell.is.t -is [string]) { $cell.is.t } else { $cell.is.t.'#text' }
      } elseif ($cell.t -eq 'b') {
        if ($cell.v -eq '1') { 'TRUE' } else { 'FALSE' }
      } else {
        [string]$cell.v
      }
      $values[(Get-ColumnIndex $cell.r)] = $value
    }
    ,$values
  }

  $outputDirectory = Split-Path -Parent $OutputPath
  if ($outputDirectory) { [System.IO.Directory]::CreateDirectory($outputDirectory) | Out-Null }
  function ConvertTo-CsvField([string]$value) {
    if ($null -eq $value) { $value = '' }
    return '"' + $value.Replace('"', '""') + '"'
  }

  $csv = $csvRows | ForEach-Object {
    (@($_ | ForEach-Object { ConvertTo-CsvField $_ }) -join ',')
  }
  [System.IO.File]::WriteAllLines((Join-Path (Get-Location) $OutputPath), $csv, [System.Text.UTF8Encoding]::new($false))
  Write-Output "Converted $($csvRows.Count - 1) records to $OutputPath"
  Write-Output ($csvRows[0] -join ' | ')
}
finally {
  $archive.Dispose()
}
