# AI Clipper Studio — foundation

A Next.js starter for an AI-assisted YouTube clip workflow. The UI is ready for:
- YouTube URL intake
- portrait 9:16 + landscape 16:9 output selection
- viral-style editing preset
- job status and clip-result presentation

## Run locally
1. Install Node.js 20 or newer.
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:3000

## Deploy to Netlify
Import this project into a Git provider, connect the repository to Netlify, and deploy.
The included `netlify.toml` configures the Next.js adapter.

## Important processing boundary
This foundation does **not** download or process YouTube videos yet. A production pipeline needs an authorized source file (for example, a video uploaded by the user or a video the user has rights to process), transcription, highlight scoring, FFmpeg rendering, and object storage. Do not implement unauthorized YouTube downloading or bypass YouTube access controls.

The `/api/jobs` route currently validates input and returns a clear `PROCESSOR_NOT_CONFIGURED` response. Connect a secure worker through `CLIPPER_WORKER_URL` and `CLIPPER_WORKER_SECRET` before enabling real rendering. Keep API keys on the server; never expose them in client-side code.
