'use client'

import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  
  const [stats, setStats] = useState(null)
  const [importing, setImporting] = useState(false)
  const [message, setMessage] = useState(null)

  // İstatistikleri yükle
  const loadStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('İstatistik yüklenemedi:', error)
    }
  }

  // LocalStorage'dan auth durumunu kontrol et
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadStats()
    }
  }, [])

  // Login işlemi
  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('adminAuth', 'true')
        setIsAuthenticated(true)
        loadStats()
      } else {
        setAuthError(data.message || 'Şifre hatalı!')
      }
    } catch (error) {
      setAuthError('Bağlantı hatası!')
    } finally {
      setAuthLoading(false)
    }
  }

  // Logout işlemi
  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
    setPassword('')
  }

  // Login ekranı
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                <svg className="w-12 h-12 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                🔐 Admin Girişi
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Admin panel'e erişim için şifre gerekli
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Şifre
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin şifresini girin"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                  disabled={authLoading}
                  autoFocus
                />
              </div>

              {authError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-300 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {authError}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading || !password}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {authLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Kontrol ediliyor...
                  </>
                ) : (
                  'Giriş Yap'
                )}
              </button>

              <div className="text-center">
                <a
                  href="/"
                  className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Ana Sayfaya Dön
                </a>
              </div>
            </form>

          </div>
        </div>
      </div>
    )
  }

  // Excel'e export
  const handleExport = async () => {
    try {
      setMessage({ type: 'info', text: 'Excel dosyası hazırlanıyor...' })
      
      const response = await fetch('/api/admin/export')
      const data = await response.json()
      
      if (data.success) {
        // Excel dosyası oluştur
        const ws = XLSX.utils.json_to_sheet(data.barkodlar)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Barkodlar')
        
        // İndir
        const fileName = `barkodlar_${new Date().toISOString().slice(0, 10)}.xlsx`
        XLSX.writeFile(wb, fileName)
        
        setMessage({ type: 'success', text: `✅ ${data.count} barkod Excel'e aktarıldı!` })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Export işlemi başarısız!' })
    }
  }

  // Excel'den import
  const handleImport = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setImporting(true)
    setMessage({ type: 'info', text: 'Excel dosyası okunuyor...' })

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)

      // Formatı kontrol et ve dönüştür
      const barkodlar = {}
      let validCount = 0
      let invalidCount = 0

      jsonData.forEach((row) => {
        const barkod = row.Barkod || row.barkod || row.BARKOD
        const gramaj = row.Gramaj || row.gramaj || row.GRAMAJ

        if (barkod && gramaj) {
          barkodlar[String(barkod)] = String(gramaj)
          validCount++
        } else {
          invalidCount++
        }
      })

      if (validCount === 0) {
        setMessage({ 
          type: 'error', 
          text: '❌ Geçerli barkod bulunamadı! Excel formatını kontrol edin.' 
        })
        setImporting(false)
        return
      }

      // API'ye gönder
      const response = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ barkodlar, mode: 'merge' })
      })

      const result = await response.json()

      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: `✅ ${validCount} barkod başarıyla yüklendi! ${invalidCount > 0 ? `(${invalidCount} geçersiz satır atlandı)` : ''}` 
        })
        loadStats()
      } else {
        setMessage({ type: 'error', text: result.message || 'Import işlemi başarısız!' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Dosya okuma hatası! Formatı kontrol edin.' })
    } finally {
      setImporting(false)
      e.target.value = ''
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            📊 Admin Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Barkod veritabanı yönetimi
          </p>
        </div>

        {/* Stats Card */}
        {stats && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              📈 İstatistikler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Barkod</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.totalBarcodes.toLocaleString('tr-TR')}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Veritabanı Boyutu</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {(stats.dataSize / 1024).toFixed(2)} KB
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Son Güncelleme</p>
                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {new Date(stats.lastModified).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800' :
            message.type === 'error' ? 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800' :
            'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
          }`}>
            <p className={`${
              message.type === 'success' ? 'text-green-700 dark:text-green-300' :
              message.type === 'error' ? 'text-red-700 dark:text-red-300' :
              'text-blue-700 dark:text-blue-300'
            }`}>
              {message.text}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Import Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Excel Import
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Excel dosyasından barkod listesi yükleyin
            </p>
            <div className="space-y-3">
              <label className="block">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleImport}
                  disabled={importing}
                  className="hidden"
                  id="excel-import"
                />
                <label
                  htmlFor="excel-import"
                  className={`flex items-center justify-center w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold rounded-lg cursor-pointer transition-colors ${importing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {importing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Yükleniyor...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Excel Dosyası Seç
                    </>
                  )}
                </label>
              </label>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-sm">
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">📋 Excel Formatı:</p>
                <p className="text-gray-600 dark:text-gray-400">Kolonlar: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">Barkod</code> ve <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">Gramaj</code></p>
              </div>
            </div>
          </div>

          {/* Export Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Excel Export
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Tüm barkod listesini Excel'e aktarın
            </p>
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              Excel Olarak İndir
            </button>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-sm mt-3">
              <p className="text-gray-600 dark:text-gray-400">
                ✅ Tüm barkodlar Excel formatında indirilecek
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home & Logout */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <a
            href="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana Sayfa
          </a>
          
          <button
            onClick={handleLogout}
            className="inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  )
}
