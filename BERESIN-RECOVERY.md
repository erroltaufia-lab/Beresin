# Beresin — handoff for a fresh chat

**Status: the source code is NOT on this Mac.** Everything below was reconstructed
from evidence, not recovered from files. Read the "What is certain" section before
you trust any of it.

---

## What Beresin was

A marketplace for booking verified tradespeople (*tukang*) in Tangerang Selatan,
Indonesia. Indonesian-language, consumer-facing, with an order/booking flow and
SEO-oriented price pages per service.

The site's own title tag, verbatim:

> Beresin — Pesan Tukang Terverifikasi di Tangerang Selatan

The reference model was **hipages.com.au**, the Australian tradie marketplace.
It was visited twice during the build session, including its flooring cost
calculator, minutes before the Beresin price pages were opened.

Built on **16–17 July 2026**, running on `localhost:3000`.

---

## What is certain (direct evidence)

All of this comes from Chrome history synced from the old laptop. These are real
URLs that were really served, with their real page titles.

### Routes that existed and rendered

| Route | Page title as served |
|---|---|
| `/` | Beresin — Pesan Tukang Terverifikasi di Tangerang Selatan |
| `/beranda` | (same title) — signed-in home |
| `/masuk` | (same title) — login |
| `/buat-pesanan` | (same title) — create an order |
| `/pesanan/[id]` | (same title) — single order view |
| `/cara-kerja` | Cara Kerja Beresin untuk Pemilik Rumah |
| `/faq` | Pertanyaan Umum (FAQ) |
| `/layanan/ac` | Biaya Service AC di Tangerang Selatan 2026: Rp75.000 – Rp450.000 |
| `/layanan/ledeng` | Biaya Ledeng & Pipa di Tangerang Selatan 2026: Rp100.000 – Rp500.000 |
| `/layanan/lainnya` | Biaya Lainnya di Tangerang Selatan 2026: Rp50.000 – Rp1.500.000 |

### Price ranges (recovered from the title tags)

| Service | Low | High |
|---|---|---|
| Service AC | Rp 75.000 | Rp 450.000 |
| Ledeng & Pipa (plumbing) | Rp 100.000 | Rp 500.000 |
| Lainnya (other) | Rp 50.000 | Rp 1.500.000 |

### Two real orders existed in the database

```
/pesanan/cmrnqpwyh0001tjjgejmx14tk
/pesanan/cmrlyph1v0029tjnwxgddrjsn
```

---

## What is inferred (high confidence, but verify)

- **Next.js App Router.** Port 3000, clean nested routes, one shared title across
  app pages with per-page overrides on the marketing pages.
- **Prisma with a real database.** Those order IDs are `cuid` values, which is
  Prisma's default ID generator. Two records with different prefixes means the
  data was seeded or created over more than one session.
- **Auth existed.** There is a `/masuk` (login) route distinct from `/beranda`
  (the signed-in home), and the login page was visited right after the order pages.
- **The `/layanan/[slug]` pages were an SEO play.** The title format
  "Biaya {service} di {city} {year}: Rp… – Rp…" is built to rank for Indonesian
  price queries. Expect a slug-driven template, not three hand-written pages.
- **Homeowner side was the focus.** `/cara-kerja` is explicitly
  "untuk Pemilik Rumah" (for homeowners), which implies a separate tradesperson
  flow was planned or existed.

---

## What is lost

No source code, no database, no screenshots, no design files. Specifically unknown:

- Visual design, colour palette, typography, logo
- The full service catalogue beyond the three price pages above
- Database schema, auth provider, and whether payments were wired up
- The tradesperson-side experience
- Whether any of it was deployed anywhere

---

## Where I already looked (all negative)

| Location | Result |
|---|---|
| `recovered-apps` folder (then in Downloads, now `~/Documents/Claude/recovered-apps`) | Only kalima, speaksmarter, halal-agency |
| Copied Claude Code transcripts in `~/Documents/.claude/projects` | Three project folders, none Beresin |
| Codex history (`~/.codex`, logs, state, chatgpt-projects) | No mention |
| Google Drive (errol.taufia@gmail.com), title and full-text | No match |
| iCloud Drive | No match |
| Spotlight, full-volume filename search | No match |
| Chrome bookmarks, downloads, cache | No match |
| GitHub, Vercel, Netlify, Railway, Render, Supabase in history | Never visited for this project |

---

## The one lead worth chasing

The copied transcripts cover exactly three project folders. Claude Code names a
folder after the project path, so Beresin's transcript would have been a fourth
folder, something like:

```
C--Users-Errol-Documents-Apps-beresin
```

That folder was never copied across. **If any backup of the old laptop's
`C:\Users\Errol\.claude\projects\` still exists** — an external drive, a OneDrive
or Dropbox sync, a USB stick, a disk image taken before the reset — that folder
would contain the complete build session, and the whole app could be replayed from
it exactly the way the other three were.

That is the only path back to the original code. Worth checking before rebuilding.

---

## If you rebuild instead

Start a new chat, paste this file, and begin with the brainstorming step rather
than jumping into code. The evidence above gives you a real starting spec:

1. **Scope the MVP.** Homeowner books a tukang. Three services to start, matching
   the recovered price bands. Tangerang Selatan only.
2. **Routes.** Reuse the recovered Indonesian route names. They were deliberate and
   they are good for SEO.
3. **Stack.** Next.js App Router, Prisma, Postgres. Matches what was there and what
   the other recovered apps use, so tooling is already installed.
4. **The SEO template.** `/layanan/[slug]` driven by a service table carrying name,
   slug, price range, and copy. This was the growth engine, not a detail.
5. **Look at hipages.com.au first.** It was the model. The cost-calculator pattern
   in particular maps onto the price pages.

Node is already installed on this Mac at `~/.local/node` and is on your PATH.

---

*Reconstructed 27 September 2026 from Chrome history timestamps 2026-07-16 23:47
through 2026-07-17 00:32.*
