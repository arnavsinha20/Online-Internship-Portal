# Import the database SQL file into MySQL using CLI
# Usage: Open PowerShell as Administrator and run this script from the backend folder:
#    .\import-db.ps1
# This script assumes mysql is available in PATH and the MySQL root password is 123456 (as provided).

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
# path to the repository root (one level up from backend)
$repoRoot = Resolve-Path (Join-Path $scriptDir "..")
$dbFile = Join-Path $repoRoot "database\database.sql"

if (-not (Test-Path $dbFile)) {
  Write-Error "database.sql not found at $dbFile"
  exit 1
}

# You can change credentials here if needed
$mysqlUser = "root"
$mysqlPass = "123456"

Write-Host "Importing $dbFile into MySQL using user $mysqlUser..." -ForegroundColor Cyan

# Construct the mysql command. Note: passing password on command line is convenient but not secure for production.
$cmd = "mysql -u $mysqlUser -p$mysqlPass < `"$dbFile`""

Write-Host "Running: $cmd" -ForegroundColor DarkGray

# Execute the command
$process = Start-Process -FilePath powershell -ArgumentList "-NoProfile -Command $cmd" -Wait -NoNewWindow -PassThru
if ($process.ExitCode -eq 0) {
  Write-Host "Database import completed successfully." -ForegroundColor Green
} else {
  Write-Error "Database import failed with exit code $($process.ExitCode). Check that 'mysql' CLI is installed and in PATH, and that credentials are correct."
}
