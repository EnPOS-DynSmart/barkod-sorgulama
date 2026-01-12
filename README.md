# Barkod Sorgulama Sistemi

Barkod numarası ile brüt gramaj bilgisini sorgulayabileceğiniz basit bir web uygulaması.

## 🚀 Özellikler

- ✨ Modern ve kullanıcı dostu arayüz
- 🔍 Hızlı barkod sorgulama
- 📊 4,293 barkod kaydı
- 🌙 Dark mode desteği
- 📱 Responsive tasarım
- ⚡ Next.js 14 ile optimize edilmiş performans

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
3. Sonuç ekranda görünecektir

Örnek barkod: `8690635060375`

## 🗂️ Proje Yapısı

```
barkod-sorgulama/
├── app/
│   ├── api/
│   │   └── barkod/
│   │       └── route.js       # API endpoint
│   ├── globals.css            # Global stiller
│   ├── layout.js              # Root layout
│   └── page.js                # Ana sayfa
├── data/
│   └── barkodlar.json         # Barkod veritabanı (4,293 kayıt)
├── next.config.js
├── package.json
├── tailwind.config.js
└── vercel.json
```

## 🎨 Teknolojiler

- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **Vercel** - Deployment platform

## 📝 Lisans

Bu proje özel kullanım içindir.
