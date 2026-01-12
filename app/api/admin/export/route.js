import { NextResponse } from 'next/server'
import barkodData from '../../../../data/barkodlar.json'

export async function GET() {
  try {
    // JSON'u Excel uyumlu formata çevir
    const barkodlar = Object.entries(barkodData).map(([barkod, gramaj]) => ({
      Barkod: barkod,
      Gramaj: gramaj
    }))

    return NextResponse.json({
      success: true,
      count: barkodlar.length,
      barkodlar
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Export işlemi başarısız' },
      { status: 500 }
    )
  }
}
