# Beresin

Marketplace for booking verified tradespeople (*tukang*) in Tangerang Selatan,
Indonesia. Homeowners describe a job, receive a quote from a verified tukang,
and pay only after the work is done.

Indonesian-language, mobile-first, modelled on hipages.com.au.

## Run it

```bash
npm install
npm run dev
```

Opens on http://localhost:3200.

Requires Node 24 LTS, installed on this machine at `~/.local/node`.

## Stack

Next.js 16 App Router · React 19 · Tailwind 4 · TypeScript. No backend yet;
orders and session live in `localStorage`.

Typeface is Plus Jakarta Sans, commissioned as Jakarta's city typeface.
Palette is workwear: graphite ink, warm paper, one hi-vis orange accent, a
trust green for verification badges. Tokens in `app/globals.css`.

## Routes

| Route | Purpose |
|---|---|
| `/` | Landing: services, how it works, tukang roster |
| `/beranda` | Orders, split into active and history |
| `/masuk` | Sign in with name and WhatsApp number |
| `/buat-pesanan` | Booking form |
| `/pesanan/[id]` | Order detail with status timeline |
| `/cara-kerja` | How it works, for homeowners |
| `/faq` | Twelve questions |
| `/layanan/[slug]` | Price page per service, built for search |

## History

The original Beresin was built in July 2026 on a laptop that was later reset
and sold. No source survived. This codebase is a rebuild from evidence
recovered out of browser history: the route names, the page titles, and three
price bands are genuine. The tradespeople and three of the six services were
invented to make the app demonstrable.

`BERESIN-RECOVERY.md` records what is real and what is not.
`HANDOFF.md` is the working brief for picking the project up.

## Next steps

1. Replace `localStorage` with Prisma and Postgres.
2. Build the tradesperson side; only the homeowner flow exists.
3. Real auth, most likely WhatsApp OTP.
4. Survey actual rates and replace the three estimated price bands.
5. Let people attach a photo to an order.
