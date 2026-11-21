 "use client";

import { useState } from "react";
import { ArrowUpRight, AudioLines, Captions, Clapperboard, Download, Film, Link2, LoaderCircle, Scissors, Sparkles, WandSparkles, Zap } from "lucide-react";

type JobResponse = { ok?: boolean; jobId?: string; status?: string; message?: string; code?: string };

export default function Home() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<"both"|"portrait"|"landscape">("both");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState(false);

  async function generate() {
    setNotice(""); setError(false);
    if (!url.trim()) { setNotice("Masukkan link video terlebih dahulu."); setError(true); return; }
    try {
      new URL(url);
    } catch { setNotice("Format URL tidak valid. Periksa kembali link video."); setError(true); return; }
    setBusy(true);
    try {
      const res = await fetch("/api/jobs", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ sourceUrl:url.trim(), format, style:"viral" }) });
      const data = (await res.json()) as JobResponse;
      setNotice(data.message || "Permintaan diterima.");
      setError(!res.ok);
    } catch {
      setNotice("Tidak dapat menghubungi server. Coba lagi setelah koneksi tersedia.");
      setError(true);
    } finally { setBusy(false); }
  }

  return <main className="shell">
    <nav className="nav">
      <a className="brand" href="#"><span className="brand-icon"><Clapperboard size={19}/></span><span>clipper<span className="brand-accent">.ai</span></span></a>
      <div className="nav-right"><span className="status-dot"/> WORKSPACE <span className="avatar">R</span></div>
    </nav>

    <section className="hero">
      <div className="eyebrow"><Sparkles size={14}/> AI VIDEO REPURPOSING STUDIO</div>
      <h1>Long video in.<br/><span>Scroll-stopping clips out.</span></h1>
      <p className="subhead">Temukan momen terbaik, potong otomatis, lalu siapkan klip untuk Shorts, TikTok, dan Reels.</p>
    </section>

    <section className="workspace">
      <div className="section-heading"><div><span className="step">01</span><h2>Tambahkan sumber video</h2></div><span className="secure"><span/> PRIVATE WORKSPACE</span></div>
      <label className="input-label" htmlFor="video-url">LINK VIDEO YOUTUBE</label>
      <div className="url-box"><Link2 size={19}/><input id="video-url" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." onKeyDown={e=>e.key==="Enter" && generate()}/><span className="paste-hint">PASTE URL</span></div>
      <p className="helper">Gunakan video milik sendiri atau video yang kamu punya izin untuk proses. Jika link tidak dapat diproses, unggah file video melalui fitur upload pada tahap berikutnya.</p>

      <div className="divider"/>
      <div className="section-heading"><div><span className="step">02</span><h2>Atur output klip</h2></div><span className="auto-tag"><WandSparkles size={13}/> AI PRESET</span></div>
      <div className="format-grid">
        <button className={`format-card ${format==="both"?"selected":""}`} onClick={()=>setFormat("both")}><div className="format-preview both-preview"><span/><span/></div><strong>Both formats</strong><small>Portrait 9:16 + Landscape 16:9</small>{format==="both"&&<i>✓</i>}</button>
        <button className={`format-card ${format==="portrait"?"selected":""}`} onClick={()=>setFormat("portrait")}><div className="format-preview portrait-preview"><span/></div><strong>Portrait</strong><small>Shorts, TikTok, Reels</small>{format==="portrait"&&<i>✓</i>}</button>
        <button className={`format-card ${format==="landscape"?"selected":""}`} onClick={()=>setFormat("landscape")}><div className="format-preview landscape-preview"><span/></div><strong>Landscape</strong><small>YouTube horizontal</small>{format==="landscape"&&<i>✓</i>}</button>
      </div>

      <div className="preset-row"><div className="preset-icon"><Zap size={18}/></div><div className="preset-copy"><strong>Viral punchy edit</strong><span>Dynamic captions · smart cuts · zoom emphasis · sound accents</span></div><span className="preset-active">ACTIVE</span></div>

      <button className="generate" onClick={generate} disabled={busy}>{busy?<><LoaderCircle className="spin" size={18}/> MEMPROSES...</>:<><Sparkles size={18}/> GENERATE CLIPS <ArrowUpRight size={17}/></>}</button>
      {notice && <div className={`notice ${error?"notice-error":"notice-ok"}`}>{notice}</div>}
      <p className="fineprint">Dengan melanjutkan, pastikan kamu memiliki hak atau izin untuk menggunakan video sumber.</p>
    </section>

    <section className="steps-section">
      <div className="section-heading"><div><span className="step">03</span><h2>Dari video panjang ke klip siap upload</h2></div></div>
      <div className="pipeline">
        <div className="pipe-item"><span className="pipe-icon"><AudioLines/></span><strong>Analyze</strong><small>AI membaca konteks & transkrip</small></div>
        <div className="pipe-line"/>
        <div className="pipe-item"><span className="pipe-icon"><Scissors/></span><strong>Find moments</strong><small>Skor hook dan momen penting</small></div>
        <div className="pipe-line"/>
        <div className="pipe-item"><span className="pipe-icon"><Captions/></span><strong>Style</strong><small>Subtitle & sound design</small></div>
        <div className="pipe-line"/>
        <div className="pipe-item"><span className="pipe-icon"><Download/></span><strong>Export</strong><small>Render format pilihan</small></div>
      </div>
    </section>

    <footer><span>CLIPPER.AI</span><span>BUILT FOR CREATORS · BETA FOUNDATION</span></footer>
  </main>;
}
