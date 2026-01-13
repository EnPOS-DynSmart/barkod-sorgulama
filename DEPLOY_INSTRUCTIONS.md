# 🚀 Deploy Talimatları

## Son Değişiklikler (13 Ocak 2026)

### ✅ Tamamlanan İşlemler:
1. ✅ Gramaj formatlaması düzeltildi
   - < 1 kg: gram gösterimi (örn: 280 gr)
   - ≥ 1 kg: kilogram gösterimi (örn: 1.004 kg)
2. ✅ "Brüt Gramaj" → "Brüt Ağırlık"
3. ✅ README.md güncellendi (6,465 barkod)
4. ✅ Dosyalar commit'e hazır

## 📝 Git Komutları

Terminal'de çalıştır:

```bash
cd js/barkod-sorgulama
git add .
git commit -m "Gramaj formatlaması düzeltildi - otomatik gr/kg gösterimi"
git push origin main
```

## 🚀 Vercel Deploy

```bash
node %APPDATA%\npm\node_modules\vercel\dist\index.js --prod
```

Veya:

```bash
vercel --prod
```

## 🔗 Canlı URL'ler

- https://barkod-sorgulama.vercel.app
- https://barkod-sorgulama-enpos-dynsmarts-projects.vercel.app

## 🧪 Test Senaryoları

Deploy sonrası test et:

1. **280 gr testi**: `3574661731902` → "280 gr" görünmeli
2. **992 gr testi**: `8690635060375` → "992 gr" görünmeli  
3. **1.004 kg testi**: Terazi barkodu → "1.004 kg" görünmeli
4. **Barkod sayısı**: Ana sayfada "6,465 barkod kayıtlı" görünmeli

## ✨ Özellikler

- ✅ 6,465 barkod
- ✅ Akıllı ağırlık formatlaması
- ✅ Admin panel (şifre: admin123)
- ✅ Excel import/export
- ✅ Dark mode
- ✅ Türkçe karakter desteği

---

**Hazır! Sadece yukarıdaki git komutlarını çalıştır ve deploy et.** 🎉
