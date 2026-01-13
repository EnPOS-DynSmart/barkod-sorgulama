# Barkod Sorgulama Sistemi

Barkod numarası ile brüt ağırlık bilgisini sorgulayabileceğiniz modern bir web uygulaması.

## 🚀 Özellikler

- ✨ Modern ve kullanıcı dostu arayüz
- 🔍 Hızlı barkod sorgulama
- 📊 6,465 barkod kaydı
- ⚖️ Akıllı ağırlık formatlaması (gram/kg otomatik)
- 🔐 Şifre korumalı admin panel
- 📥 Excel import/export
- 🌙 Dark mode desteği
- 📱 Responsive tasarım
- ⚡ Next.js 15 ile optimize edilmiş performans

## 🛠️ Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
npm start
```

## 📦 Vercel'e Deploy

### Yöntem 1: Vercel CLI ile

```bash
# Vercel CLI'yi yükle
npm i -g vercel

# Deploy et
cd js/barkod-sorgulama
vercel
```

### Yöntem 2: GitHub üzerinden

1. Projeyi GitHub'a push edin
2. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
3. "New Project" butonuna tıklayın
4. GitHub repository'sini seçin
5. Root directory olarak `js/barkod-sorgulama` klasörünü seçin
6. Deploy butonuna tıklayın

## 💻 Kullanım

1. Ana sayfada barkod numarasını girin
2. "Sorgula" butonuna tıklayın
3. Ağırlık bilgisi otomatik olarak gram veya kg cinsinden görünecektir

### Örnek Barkodlar

- `8690635060375` → 992 gr
- `3574661731902` → 280 gr
- `793550` → 280 gr

## 🔐 Admin Panel

Admin paneline `/admin` sayfasından erişebilirsiniz.

**Varsayılan Şifre:** `admin123`

Admin panelinde:
- Excel dosyasından toplu barkod import
- Mevcut barkodları Excel'e export
- Barkod istatistikleri

## 📊 Ağırlık Formatlaması

Sistem otomatik olarak ağırlığı en uygun formatta gösterir:
- **1 kg'dan küçük**: Gram cinsinden (örn: 280 gr, 992 gr)
- **1 kg ve üzeri**: Kilogram cinsinden (örn: 1.004 kg, 2.500 kg)

## 🗂️ Proje Yapısı

```
barkod-sorgulama/
├── app/
│   ├── api/
│   │   ├── barkod/
│   │   │   └── route.js       # Barkod sorgulama API
│   │   └── admin/             # Admin API'leri
│   ├── admin/
│   │   └── page.js            # Admin panel
│   ├── globals.css            # Global stiller
│   ├── layout.js              # Root layout
│   └── page.js                # Ana sayfa
├── data/
│   └── barkodlar.json         # Barkod veritabanı (6,465 kayıt)
├── next.config.js
├── package.json
├── tailwind.config.js
└── vercel.json
```

## 🎨 Teknolojiler

- **Next.js 15** - React framework
- **Tailwind CSS** - Styling
- **Vercel** - Deployment platform

## 📝 Lisans

Bu proje özel kullanım içindir.
