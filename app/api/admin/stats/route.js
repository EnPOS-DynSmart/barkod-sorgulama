import { NextResponse } from 'next/server'
import barkodData from '../../../../data/barkodlar.json'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'barkodlar.json')
    const stats = fs.statSync(dataPath)
    
    const totalBarcodes = Object.keys(barkodData).length
    const dataSize = stats.size
    const lastModified = stats.mtime

    return NextResponse.json({
      success: true,
      totalBarcodes,
      dataSize,
      lastModified
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'İstatistik alınamadı' },
      { status: 500 }
    )
  }
}
