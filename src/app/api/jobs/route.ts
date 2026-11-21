import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: { sourceUrl?: string; format?: string; style?: string };
  try { body = await request.json(); }
  catch { return NextResponse.json({ message: "Request body tidak valid." }, { status: 400 }); }

  if (!body.sourceUrl) return NextResponse.json({ message: "Link video wajib diisi." }, { status: 400 });
  let parsed: URL;
  try { parsed = new URL(body.sourceUrl); }
  catch { return NextResponse.json({ message: "URL tidak valid." }, { status: 400 }); }

  const host = parsed.hostname.toLowerCase().replace(/^www\\./, "");
  if (!["youtube.com", "m.youtube.com", "youtu.be"].includes(host)) {
    return NextResponse.json({ message: "Untuk fondasi awal, masukkan URL YouTube yang valid." }, { status: 400 });
  }

  const workerUrl = process.env.CLIPPER_WORKER_URL;
  const workerSecret = process.env.CLIPPER_WORKER_SECRET;
  if (!workerUrl || !workerSecret) {
    return NextResponse.json({
      code: "PROCESSOR_NOT_CONFIGURED",
      message: "Fondasi website sudah berjalan, tetapi mesin AI/FFmpeg belum terhubung. Tahap berikutnya adalah memasang worker pemrosesan video. Belum ada video yang diunduh atau dirender."
    }, { status: 503 });
  }

  try {
    const upstream = await fetch(`${workerUrl.replace(/\\/$/, "")}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${workerSecret}` },
      body: JSON.stringify({ sourceUrl: body.sourceUrl, format: body.format ?? "both", style: body.style ?? "viral" }),
      cache: "no-store"
    });
    const result = await upstream.json();
    return NextResponse.json(result, { status: upstream.status });
  } catch {
    return NextResponse.json({ message: "Worker pemrosesan tidak dapat dijangkau." }, { status: 502 });
  }
}
