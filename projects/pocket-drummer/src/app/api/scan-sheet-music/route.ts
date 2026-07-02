import { NextRequest, NextResponse } from 'next/server';
import { scanSheetMusic } from '@/lib/gemini';
import { getStandardDrumMusicXML } from '@/lib/mockData';

export const maxDuration = 120;

const MAX_SCAN_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const systemPrompt = formData.get('systemPrompt') as string | null;

    if (!file) {
      return NextResponse.json({ error: "Ingen fil modtaget i anmodningen." }, { status: 400 });
    }

    if (file.size > MAX_SCAN_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Filen er for stor til hurtig OMR-scanning. Brug en fil under 10 MB eller beskær/komprimér nodearket." },
        { status: 413 }
      );
    }

    const mimeType = file.type || 'image/jpeg';
    
    // Convert browser file to base64 buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');

    // Run the OMR processing via Gemini
    const xml = await scanSheetMusic({ 
      base64Data, 
      mimeType, 
      systemPrompt: systemPrompt || undefined 
    });

    return NextResponse.json({ xml });
  } catch (error) {
    console.error("Fejl i /api/scan-sheet-music:", error);
    const message = error instanceof Error ? error.message : String(error);

    if (message.includes("Gemini API timeout")) {
      return NextResponse.json({
        xml: getStandardDrumMusicXML("Scannet nodeark (Gemini timeout fallback)", 100, "standard"),
        warning: "Gemini OMR tog for lang tid og blev afbrudt. Viser en gyldig fallback-node, så preview/gem-flowet stadig kan testes. Prøv at beskære nodearket til kun selve nodesystemet eller konverter PDF'en til et skarpt PNG/JPG."
      });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
