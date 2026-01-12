# 📊 Excel Import/Export Kullanım Rehberi

## 🎯 Özellikler

✅ **Excel Import**: Toplu barkod yükleme  
✅ **Excel Export**: Tüm barkodları Excel'e aktar  
✅ **Admin Panel**: Kullanıcı dostu arayüz  
✅ **İstatistikler**: Barkod sayısı, dosya boyutu, son güncelleme  
✅ **Otomatik Yedekleme**: Her import'ta yedek alınır  

---

## 🌐 Admin Panel'e Erişim

### URL:
```
http://localhost:3000/admin
```

veya ana sayfadan "Admin Panel (Excel Import/Export)" linkine tıkla.

---

## 📥 Excel Import (Barkod Yükleme)

### 1. Excel Dosyası Hazırla

Excel dosyanızda **2 kolon** olmalı:

| Barkod        | Gramaj |
|---------------|--------|
| 8690635060375 | 00.992 |
| 8690508101426 | 00.930 |
| 8693891196048 | 01.798 |

**Önemli Notlar:**
- Kolon isimleri: `Barkod` ve `Gramaj` (büyük/küçük harf fark etmez)
- İlk satır başlık satırı olmalı
- Barkodlar metin formatında
- Gramaj formatı: `00.992` şeklinde

### 2. Import İşlemi

1. Admin panel'e git: `http://localhost:3000/admin`
2. **"Excel Import"** kartında **"Excel Dosyası Seç"** butonuna tıkla
3. Hazırladığın Excel dosyasını seç
4. Dosya otomatik olarak yüklenecek
5. Başarı mesajı göreceksin: "✅ X barkod başarıyla yüklendi!"

### 3. Import Modu

**Merge (Birleştir)**: Varsayılan mod
- Mevcut barkodları korur
- Yeni barkodları ekler
- Aynı barkod varsa günceller

### 4. Örnek Excel Şablonu

Excel'de şu şekilde oluştur:

```
A1: Barkod         B1: Gramaj
A2: 8690635060375  B2: 00.992
A3: 8690508101426  B3: 00.930
A4: 8693891196048  B4: 01.798
```

Kaydet: `File → Save As → Excel Workbook (.xlsx)`

---

## 📤 Excel Export (Barkod İndirme)

### 1. Export İşlemi

1. Admin panel'e git: `http://localhost:3000/admin`
2. **"Excel Export"** kartında **"Excel Olarak İndir"** butonuna tıkla
3. Excel dosyası otomatik indirilecek
4. Dosya adı: `barkodlar_YYYY-MM-DD.xlsx`

### 2. İndirilen Dosya

İndirilen Excel dosyası şu formatta olacak:

| Barkod        | Gramaj |
|---------------|--------|
| 8690635060375 | 00.992 |
| 8690508101426 | 00.930 |
| ...           | ...    |

**Bu dosyayı:**
- Düzenleyebilirsin
- Yedek olarak saklayabilirsin
- Tekrar import edebilirsin

---

## 📊 İstatistikler

Admin panelde şu bilgileri görebilirsin:

- **Toplam Barkod**: Sistemde kayıtlı barkod sayısı
- **Veritabanı Boyutu**: JSON dosya boyutu (KB)
- **Son Güncelleme**: Veritabanının son güncellenme tarihi

---

## 🔄 Kullanım Senaryoları

### Senaryo 1: Yeni Barkodlar Ekle

```
1. Mevcut barkodları export et (yedek için)
2. Export edilen Excel'i aç
3. Yeni barkodları ekle
4. Dosyayı kaydet
5. Import et
```

### Senaryo 2: Toplu Güncelleme

```
1. Excel'de barkod listeni hazırla
2. Admin panel'de import et
3. Aynı barkodlar güncellenecek, yenileri eklenecek
```

### Senaryo 3: Yedekleme

```
1. Periyodik olarak Excel export et
2. Dosyayı güvenli bir yere kaydet
3. Gerektiğinde geri yükle
```

### Senaryo 4: Başka Bir Sistemden Aktarma

```
1. Diğer sistemden barkodları Excel'e aktar
2. Kolonları "Barkod" ve "Gramaj" olarak düzenle
3. Dosyayı kaydet
4. Admin panel'de import et
```

---

## ⚠️ Önemli Notlar

### ✅ Yapılması Gerekenler:
- Excel formatını kontrol et
- Kolon isimlerini doğru yaz
- İlk satır başlık olmalı
- Büyük değişikliklerden önce export al

### ❌ Yapılmaması Gerekenler:
- Boş satır bırakma
- Ekstra kolonlar ekleme (sadece Barkod ve Gramaj)
- Barkod kolonunu sayı formatında bırakma (metin olmalı)

---

## 💾 Otomatik Yedekleme

Her import işleminde otomatik yedek alınır:

**Yedek Dosyası:**
```
data/barkodlar_backup_TIMESTAMP.json
```

**Manuel Yedekleme:**
```powershell
cd js/barkod-sorgulama/data
Copy-Item barkodlar.json barkodlar_yedek_$(Get-Date -Format 'yyyyMMdd').json
```

---

## 🆘 Sorun Giderme

### Problem: "Geçerli barkod bulunamadı"

**Çözüm:**
- Kolon isimlerini kontrol et: `Barkod` ve `Gramaj`
- İlk satırın başlık olduğundan emin ol
- Excel formatını kontrol et (.xlsx veya .xls)

### Problem: "Dosya okuma hatası"

**Çözüm:**
- Excel dosyasını Excel'de aç ve tekrar kaydet
- Dosya bozuk olmadığından emin ol
- Farklı bir Excel versiyonu dene

### Problem: Import sonrası barkod bulunamıyor

**Çözüm:**
- Sayfayı yenile (F5)
- Development server'ı yeniden başlat
- `data/barkodlar.json` dosyasını kontrol et

---

## 🧪 Test Verisi

Test için örnek Excel:

| Barkod        | Gramaj |
|---------------|--------|
| 1111111111111 | 01.000 |
| 2222222222222 | 02.500 |
| 3333333333333 | 03.750 |

Bu veriyi kullanarak import/export'u test edebilirsin.

---

## 🚀 Production'da Kullanım

Vercel'e deploy ettikten sonra:

```
https://your-app.vercel.app/admin
```

adresi ile erişim yapabilirsin!

---

## 📝 Excel Format Şablonu İndirme

Admin panelde gelecekte "Şablon İndir" özelliği eklenebilir. Şimdilik manuel oluşturabilirsin.

---

Başka soru var mı? 🚀
