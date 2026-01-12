# ============================================
# BARKOD EKLEME SCRIPT'İ
# ============================================
# Kullanım: Bu scripti PowerShell'de çalıştır
# ============================================

param(
    [Parameter(Mandatory=$false)]
    [string]$DosyaYolu = "",
    
    [Parameter(Mandatory=$false)]
    [switch]$TamamenYeniListe
)

$ErrorActionPreference = "Stop"

Write-Host "`n╔════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║          BARKOD LİSTESİ GÜNCELLEME ARACI           ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Proje dizinine git
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Mevcut barkod sayısını göster
$mevcutJson = Get-Content "data/barkodlar.json" -Raw | ConvertFrom-Json
$mevcutSayi = ($mevcutJson.PSObject.Properties | Measure-Object).Count
Write-Host "📊 Mevcut barkod sayısı: $mevcutSayi`n" -ForegroundColor Yellow

# Dosya yolu yoksa sor
if ([string]::IsNullOrEmpty($DosyaYolu)) {
    Write-Host "📁 Yeni barkod listesi dosya yolu:" -ForegroundColor Yellow
    Write-Host "   (Örn: C:\Users\...\YeniBarkodlar.txt)" -ForegroundColor DarkGray
    Write-Host "   Format: BARKOD;GRAMAJ`n" -ForegroundColor DarkGray
    $DosyaYolu = Read-Host "Dosya yolu"
}

# Dosya kontrolü
if (-not (Test-Path $DosyaYolu)) {
    Write-Host "❌ Dosya bulunamadı: $DosyaYolu" -ForegroundColor Red
    exit 1
}

# Dosyayı oku
Write-Host "`n🔄 Dosya okunuyor..." -ForegroundColor Cyan
$data = Get-Content $DosyaYolu

# Yeni barkodları parse et
$yeniBarkodlar = @{}
$satirSayisi = 0
$hataliSatir = 0

foreach ($line in $data) {
    $satirSayisi++
    $parts = $line -split ';'
    if ($parts.Length -eq 2) {
        $barkod = $parts[0].Trim()
        $gramaj = $parts[1].Trim()
        if (-not [string]::IsNullOrEmpty($barkod) -and -not [string]::IsNullOrEmpty($gramaj)) {
            $yeniBarkodlar[$barkod] = $gramaj
        } else {
            $hataliSatir++
        }
    } else {
        $hataliSatir++
    }
}

Write-Host "✅ Okunan satır: $satirSayisi" -ForegroundColor Green
Write-Host "✅ Geçerli barkod: $($yeniBarkodlar.Count)" -ForegroundColor Green
if ($hataliSatir -gt 0) {
    Write-Host "⚠️  Hatalı satır: $hataliSatir (atlandı)" -ForegroundColor Yellow
}

if ($yeniBarkodlar.Count -eq 0) {
    Write-Host "`n❌ Geçerli barkod bulunamadı!" -ForegroundColor Red
    exit 1
}

# İşlem seçeneği
if (-not $TamamenYeniListe) {
    Write-Host "`n❓ Ne yapmak istersin?" -ForegroundColor Yellow
    Write-Host "   1. Mevcut listeye ekle/güncelle (önerilen)" -ForegroundColor White
    Write-Host "   2. Tamamen yeni liste oluştur (mevcut liste silinir)" -ForegroundColor White
    $secim = Read-Host "`nSeçim (1/2)"
    
    if ($secim -eq "2") {
        $TamamenYeniListe = $true
    }
}

# Yedek oluştur
$yedekDosya = "data/barkodlar_yedek_$(Get-Date -Format 'yyyyMMdd_HHmmss').json"
Copy-Item "data/barkodlar.json" $yedekDosya
Write-Host "`n💾 Yedek oluşturuldu: $yedekDosya" -ForegroundColor Green

# İşlemi gerçekleştir
$sonucBarkodlar = @{}

if ($TamamenYeniListe) {
    Write-Host "`n🔄 Tamamen yeni liste oluşturuluyor..." -ForegroundColor Cyan
    $sonucBarkodlar = $yeniBarkodlar
} else {
    Write-Host "`n🔄 Mevcut listeye ekleniyor/güncelleniyor..." -ForegroundColor Cyan
    
    # Mevcut barkodları kopyala
    $mevcutJson.PSObject.Properties | ForEach-Object {
        $sonucBarkodlar[$_.Name] = $_.Value
    }
    
    # Yeni barkodları ekle/güncelle
    $eklenenSayi = 0
    $guncellenenSayi = 0
    
    foreach ($key in $yeniBarkodlar.Keys) {
        if ($sonucBarkodlar.ContainsKey($key)) {
            if ($sonucBarkodlar[$key] -ne $yeniBarkodlar[$key]) {
                $guncellenenSayi++
            }
        } else {
            $eklenenSayi++
        }
        $sonucBarkodlar[$key] = $yeniBarkodlar[$key]
    }
    
    Write-Host "✅ Eklenen: $eklenenSayi" -ForegroundColor Green
    Write-Host "✅ Güncellenen: $guncellenenSayi" -ForegroundColor Green
}

# JSON'a çevir ve kaydet
$json = $sonucBarkodlar | ConvertTo-Json -Compress
Set-Content -Path "data/barkodlar.json" -Value $json -Force

Write-Host "`n╔════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                  ✅ TAMAMLANDI!                    ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host "`n📊 Toplam barkod sayısı: $($sonucBarkodlar.Count)" -ForegroundColor Yellow
Write-Host "📊 Önceki barkod sayısı: $mevcutSayi" -ForegroundColor DarkGray
Write-Host "📊 Fark: $(($sonucBarkodlar.Count - $mevcutSayi))`n" -ForegroundColor $(if (($sonucBarkodlar.Count - $mevcutSayi) -ge 0) { "Green" } else { "Red" })

Write-Host "💡 Development server çalışıyorsa otomatik yenilenecek!" -ForegroundColor Cyan
Write-Host "🧪 Test et: http://localhost:3000`n" -ForegroundColor Cyan
