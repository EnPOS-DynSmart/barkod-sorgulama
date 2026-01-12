import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request) {
  try {
    const { barkodlar, mode = 'merge' } = await request.json()

    if (!barkodlar || typeof barkodlar !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Geçersiz veri formatı' },
        { status: 400 }
      )
    }

    const dataPath = path.join(process.cwd(), 'data', 'barkodlar.json')
    
    let finalData = {}

    if (mode === 'merge') {
      // Mevcut veriyi oku ve birleştir
      const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      finalData = { ...currentData, ...barkodlar }
    } else {
      // Tamamen yeni veri
      finalData = barkodlar
    }

    // Yedek oluştur
    const backupPath = path.join(
      process.cwd(),
      'data',
      `barkodlar_backup_${Date.now()}.json`
    )
    fs.copyFileSync(dataPath, backupPath)

    // Yeni veriyi kaydet
    fs.writeFileSync(dataPath, JSON.stringify(finalData), 'utf8')

    return NextResponse.json({
      success: true,
      message: 'Barkodlar başarıyla yüklendi',
      count: Object.keys(finalData).length,
      imported: Object.keys(barkodlar).length
    })
  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json(
      { success: false, message: 'Import işlemi başarısız: ' + error.message },
      { status: 500 }
    )
  }
}
