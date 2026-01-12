# 🚀 Vercel'e Deploy Rehberi

## Hızlı Deploy (Önerilen)

### 1. Vercel CLI ile Deploy

```bash
# Terminal'de proje klasörüne git
cd js/barkod-sorgulama

# Vercel CLI kurulu değilse kur
npm i -g vercel

# Deploy et
vercel

# İlk çalıştırmada:
# - "Set up and deploy?" → Y (yes)
# - "Which scope?" → Hesabınızı seçin
# - "Link to existing project?" → N (no)
# - "What's your project's name?" → barkod-sorgulama (veya istediğiniz isim)
# - "In which directory is your code located?" → ./ (enter)
# - Diğer sorular için default ayarları kabul edin (enter)

# Production deploy için
vercel --prod
```

Komut tamamlandığında size bir URL verilecek, örnek:
- **Production**: `https://barkod-sorgulama.vercel.app`

## Alternatif: GitHub ile Deploy

### 1. GitHub'a Push

```bash
# Git repository oluştur (henüz yoksa)
cd js/barkod-sorgulama
git init
git add .
git commit -m "Initial commit"

# GitHub'a push et
git remote add origin https://github.com/KULLANICI_ADINIZ/barkod-sorgulama.git
git branch -M main
git push -u origin main
```

### 2. Vercel'e Bağla

1. [vercel.com](https://vercel.com) adresine git ve giriş yap
2. "Add New Project" butonuna tıkla
3. GitHub repository'sini import et
4. **Önemli**: "Root Directory" ayarını `js/barkod-sorgulama` olarak değiştir
5. Framework Preset: "Next.js" (otomatik seçilir)
6. "Deploy" butonuna tıkla

Deploy işlemi 1-2 dakika sürer.

## ✅ Deploy Sonrası Test

Deploy tamamlandıktan sonra:

1. Verilen URL'yi aç (örn: `https://barkod-sorgulama.vercel.app`)
2. Örnek bir barkod gir: `8690635060375`
3. Sonucu kontrol et: `00.992 gr`

## 🔧 Deploy Sorun Giderme

### Hata: "Cannot find module 'barkodlar.json'"

Eğer bu hatayı alırsanız, `data/barkodlar.json` dosyasının git'e eklendiğinden emin olun:

```bash
git add data/barkodlar.json -f
git commit -m "Add barcode data"
git push
```

### Hata: "Build failed"

```bash
# Önce lokal olarak test edin
npm run build

# Sorun yoksa deploy edin
vercel --prod
```

## 🌐 Özel Domain Bağlama (Opsiyonel)

1. Vercel Dashboard → Projeniz → Settings → Domains
2. Kendi domain'inizi ekleyin
3. DNS ayarlarını yapılandırın

## 📊 Proje Bilgileri

- **Framework**: Next.js 14
- **Barkod Sayısı**: 4,293
- **Veri Boyutu**: ~100KB
- **Build Süresi**: ~30 saniye
- **Deployment Platformu**: Vercel

## 🎉 Tamamlandı!

Artık barkod sorgulama sisteminiz yayında! 🚀
