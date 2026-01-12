# 📦 Barkod Listesi Ekleme/Güncelleme Rehberi

## 🔄 Yöntem 1: Yeni TXT Dosyasından Yükleme (En Kolay)

### Adımlar:

1. **Yeni barkod dosyanı hazırla** (aynı formatta):
   ```
   8690635060375;00.992
   8690508101426;00.930
   8693891196048;01.798
   ```

2. **PowerShell'de bu komutu çalıştır**:
   ```powershell
   # Dosya yolunu değiştir
   $yeniDosya = "C:\Users\DORUKBIYIKLI\Downloads\YeniBarkodlar.txt"
   
   cd js/barkod-sorgulama
   
   # Yeni barkodları ekle
   $data = Get-Content $yeniDosya
   $mevcutJson = Get-Content "data/barkodlar.json" | ConvertFrom-Json
   $barkodlar = @{}
   
   # Mevcut barkodları kopyala
   $mevcutJson.PSObject.Properties | ForEach-Object {
       $barkodlar[$_.Name] = $_.Value
   }
   
   # Yeni barkodları ekle/güncelle
   foreach ($line in $data) {
       $parts = $line -split ';'
       if ($parts.Length -eq 2) {
           $barkodlar[$parts[0]] = $parts[1]
       }
   }
   
   # Kaydet
   $json = $barkodlar | ConvertTo-Json -Compress
   Set-Content -Path "data/barkodlar.json" -Value $json -Force
   
   Write-Host "✅ Toplam barkod sayısı: $($barkodlar.Count)" -ForegroundColor Green
   ```

3. **Sayfa otomatik yenilenecek** (development server çalışıyorsa)

---

## 🔧 Yöntem 2: Manuel JSON Düzenleme

1. **Dosyayı aç**: `js/barkod-sorgulama/data/barkodlar.json`

2. **Yeni barkod ekle**:
   ```json
   {
     "8690635060375": "00.992",
     "8690508101426": "00.930",
     "YENİ_BARKOD": "GRAMAJ"
   }
   ```

3. **Kaydet** - Otomatik yenilenecek!

---

## ➕ Yöntem 3: Mevcut Listeye Ekleme (Hızlı Script)

**Tek satır eklemek için**:
```powershell
cd js/barkod-sorgulama
$json = Get-Content "data/barkodlar.json" | ConvertFrom-Json
$json | Add-Member -NotePropertyName "BARKOD_NO" -NotePropertyValue "GRAMAJ" -Force
$json | ConvertTo-Json -Compress | Set-Content "data/barkodlar.json"
```

**Örnek**:
```powershell
cd js/barkod-sorgulama
$json = Get-Content "data/barkodlar.json" | ConvertFrom-Json
$json | Add-Member -NotePropertyName "1234567890123" -NotePropertyValue "02.500" -Force
$json | ConvertTo-Json -Compress | Set-Content "data/barkodlar.json"
Write-Host "✅ Barkod eklendi!" -ForegroundColor Green
```

---

## 🔄 Yöntem 4: Tamamen Yeni Liste (Eski Listeyi Sil)

```powershell
cd js/barkod-sorgulama

# Yeni dosya yolu
$yeniDosya = "C:\Users\DORUKBIYIKLI\Downloads\YeniBarkodlar.txt"

# Eski listeyi yedekle
Copy-Item "data/barkodlar.json" "data/barkodlar_yedek_$(Get-Date -Format 'yyyyMMdd_HHmmss').json"

# Yeni listeyi yükle
$data = Get-Content $yeniDosya
$barkodlar = @{}
foreach ($line in $data) {
    $parts = $line -split ';'
    if ($parts.Length -eq 2) {
        $barkodlar[$parts[0]] = $parts[1]
    }
}

$json = $barkodlar | ConvertTo-Json -Compress
Set-Content -Path "data/barkodlar.json" -Value $json -Force

Write-Host "✅ Yeni liste yüklendi: $($barkodlar.Count) barkod" -ForegroundColor Green
```

---

## 📊 Yöntem 5: Excel'den Yükleme

**Excel dosyanı CSV'ye çevir**:

1. Excel'de "Farklı Kaydet" → **CSV (Comma delimited)**
2. Dosyayı düzenle, `;` ayracını koru
3. Yöntem 1'i kullan

---

## 🚀 Production'a Deployment

Barkodları güncelledikten sonra:

```bash
# Local test et
npm run build

# Vercel'e deploy et
vercel --prod
```

---

## ⚠️ Önemli Notlar

1. **Format**: `BARKOD;GRAMAJ` (noktalı virgül ile ayrılmış)
2. **Gramaj formatı**: `00.992` (3 haneli, noktalı)
3. **Encoding**: UTF-8 olmalı
4. **Yedekleme**: Büyük değişikliklerden önce yedek al!

---

## 🧪 Test Et

Yeni barkod ekledikten sonra:
```
http://localhost:3000
```
adresinde test et!

---

## 🆘 Sorun mu Var?

**JSON hatası alırsan**:
```powershell
cd js/barkod-sorgulama
# JSON'u kontrol et
Get-Content "data/barkodlar.json" | ConvertFrom-Json | Measure-Object | Select-Object Count
```

**Yedekten geri yükle**:
```powershell
cd js/barkod-sorgulama/data
Copy-Item "barkodlar_yedek_TARIH.json" "barkodlar.json" -Force
```

---

Başka sorun mu var? Yardım için sor! 🚀
