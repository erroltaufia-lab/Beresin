# Beresin — start here

Paste this whole file into a new Claude Code chat to pick the project up.

---

## Open this folder

```
/Users/erroltaufia/Documents/Claude/beresin
```

Everything I save locally goes under `~/Documents/Claude`. Keep it that way, and
keep `~/Documents/Claude/INDEX.md` current when paths change.

## Run it

```bash
export PATH="$HOME/.local/node/bin:$PATH"
cd ~/Documents/Claude/beresin
npm install
npm run dev
```

Serves on http://localhost:3200. Node 24.20.0 is installed at `~/.local/node`
and is on PATH via `~/.zshrc`. There is no Homebrew on this Mac.

---

## FIRST TASK: finish the GitHub push

The repo is a git repo on branch `main` with 4 commits and a clean tree. The
remote is already wired:

```
origin  git@github.com:erroltaufia-lab/beresin.git
```

SSH is set up and working. `ssh -T git@github.com` answers
"Hi erroltaufia-lab!". The key is `~/.ssh/id_ed25519`, no passphrase.

**What is missing: the repository does not exist on GitHub yet.** I have no
GitHub CLI (I don't want it installed) and I will not hand over an API token.

So I create it myself at https://github.com/new:
- Name `beresin`
- Private
- No README, no .gitignore, no licence — the repo already has all three

Once I confirm it exists, run:

```bash
cd ~/Documents/Claude/beresin && git push -u origin main
```

Then confirm all 4 commits landed. Do not try to create the repo for me, and
do not ask me for a token.

---

## What the app is

A marketplace for booking verified tradespeople (*tukang*) in Tangerang
Selatan, Indonesia. Indonesian-language, mobile-first. A homeowner describes a
job, a verified tukang sends a quote, the homeowner pays only after the work is
done. Modelled on hipages.com.au.

## Important: what is real and what I made up

The original Beresin was built in July 2026 on a laptop that was reset and
sold. No source survived. This codebase is a rebuild from evidence recovered
out of browser history.

**Genuine, do not change without reason:**
- All ten route names
- The Indonesian page titles, including the service page format
  `Biaya {service} di Tangerang Selatan 2026: Rp… – Rp… | Beresin`
- Three price bands: AC Rp75.000–450.000, Ledeng Rp100.000–500.000,
  Lainnya Rp50.000–1.500.000
- The two seeded order IDs, which are real cuids from the original database

**Invented for the rebuild, replace when you have real data:**
- All six tradespeople in `lib/tukang.ts`
- Three services and their prices: `listrik`, `cat`, `kebersihan`
- The entire visual design; no screenshot of the original survived

Keep that line honest. Never present invented data as recovered.

Background: `BERESIN-RECOVERY.md` in this folder.

## Stack

Next.js 16.2.10 App Router, React 19, Tailwind 4, TypeScript. No backend —
orders and session live in `localStorage`.

Plus Jakarta Sans, chosen because it was commissioned as Jakarta's city
typeface. Workwear palette: graphite ink, warm paper, one hi-vis orange accent
`#e4572e`, a trust green for verification. Tokens in `app/globals.css`.

## Routes

| Route | File |
|---|---|
| `/` | `app/page.tsx` |
| `/beranda` | `app/beranda/page.tsx` |
| `/masuk` | `app/masuk/page.tsx` |
| `/buat-pesanan` | `app/buat-pesanan/page.tsx` |
| `/pesanan/[id]` | `app/pesanan/[id]/page.tsx` |
| `/cara-kerja` | `app/cara-kerja/page.tsx` |
| `/faq` | `app/faq/page.tsx` |
| `/layanan/[slug]` | `app/layanan/[slug]/page.tsx` |

Data lives in `lib/services.ts`, `lib/tukang.ts`, `lib/store.ts`,
`lib/order-ids.ts`, `lib/format.ts`.

## Two things that look wrong but are deliberate

**The fixed order ID pool** in `lib/order-ids.ts`. A static export cannot
prerender a page for an ID that does not exist at build time, so orders draw
from a pool of 24 and every one gets a page. Delete this when a real database
generates IDs.

**"Simulasikan tukang menerima"** on a waiting order. It assigns a tukang and a
quote, standing in for the tradesperson's app, which does not exist. Remove it
when there is a real tukang flow.

## Next steps, roughly in order

1. **Database.** Prisma and Postgres. The `Order` type in `lib/store.ts` is the
   schema's starting point; swap the four exported functions for server actions
   and drop the ID pool. The original used Prisma, so this restores the
   intended architecture.
2. **The tradesperson side.** `/cara-kerja` says "untuk Pemilik Rumah" and
   there is nothing behind that implication. Tukang need to see incoming jobs,
   quote them, and mark them done.
3. **Real auth.** WhatsApp OTP fits the market.
4. **Real prices.** Survey actual Tangerang Selatan rates and replace the three
   estimated bands.
5. **Photos on orders.** A picture of the broken thing removes a lot of
   back-and-forth before a quote.

## Demo link

https://claude.ai/artifact/UN1oVA3yE1ZCgK7JuMfVug — private until I share it
from that page's Share menu. Rebuild and republish with `./build-demo.sh`.

The artifact host does not serve pages at the domain root, so a stock Next
export breaks there. `build-demo.sh` has the four fixes baked in; read its
header before changing it.
