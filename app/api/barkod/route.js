import { NextResponse } from 'next/server'
import barkodData from '../../../data/barkodlar.json'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { success: false, message: 'Barkod numarası gereklidir' },
      { status: 400 }
    )
  }

  const gramaj = barkodData[code]

  if (gramaj) {
    return NextResponse.json({
      success: true,
      barkod: code,
      gramaj: gramaj
    })
  } else {
    return NextResponse.json(
      { success: false, message: 'Barkod bulunamadı' },
      { status: 404 }
    )
  }
}
