# LocalDir — Next.js Directory Site with AdSense

Production-ready directory template with AdSense integration, GDPR consent, and SEO optimizations.

## Features

- **Next.js 14 App Router** + TypeScript + Tailwind CSS
- **AdSense Components**: Header, Sidebar, In-Feed, Anchor, In-Article, Auto ads
- **ads.txt** auto-generation (`/ads.txt` route + build script)
- **CSP Headers** configured for AdSense domains
- **GDPR/CCPA Consent Banner** with localStorage persistence
- **Schema.org LocalBusiness** structured data on listing pages
- **Sitemap.xml** & **robots.txt** auto-generation
- **Categories & Listings** with search/filter/pagination
- **Add Listing** form (client-side demo)
- **Legal Pages**: Privacy, Terms, Cookie Policy

## Quick Start

```bash
# Install dependencies
npm install

# Copy env and configure
cp .env.example .env.local
# Edit .env.local with your AdSense publisher ID and slot IDs

# Run dev server
npm run dev

# Generate ads.txt for production
npm run generate:ads-txt

# Build for production
npm run build
npm start
```

## AdSense Setup

1. Create AdSense account → get **Publisher ID** (`ca-pub-XXXXXXXXXXXXXXXX`)
2. Create ad units in AdSense console → get **Slot IDs** for each format
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
   NEXT_PUBLIC_ADSENSE_ENABLED=true
   NEXT_PUBLIC_ADSENSE_SLOT_HEADER=1234567890
   NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=2345678901
   NEXT_PUBLIC_ADSENSE_SLOT_INFEED=3456789012
   NEXT_PUBLIC_ADSENSE_SLOT_ANCHOR=4567890123
   NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE=5678901234
   ```
4. Update `src/lib/config.ts` to read slot IDs from env

## AdSense Approval Checklist

- [ ] 50+ quality, unique listings with real content
- [ ] Privacy Policy, Terms, Cookie Policy pages live
- [ ] `ads.txt` accessible at `yourdomain.com/ads.txt`
- [ ] Consent banner implemented (GDPR/CCPA)
- [ ] No placeholder/lorem ipsum content
- [ ] Site indexed in Google Search Console
- [ ] Sufficient traffic (organic preferred)
- [ ] No policy violations (adult, copyright, malware, etc.)

## Deployment

**Vercel** (recommended):
1. Push to GitHub
2. Import in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

**Netlify/Cloudflare Pages**: Similar process.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── listings/          # Listings index & detail
│   ├── categories/        # Category pages
│   ├── add-listing/       # Submit form
│   ├── privacy|terms|cookies/
│   ├── ads.txt/route.ts   # Dynamic ads.txt
│   ├── sitemap.ts         # Auto sitemap
│   └── robots.ts          # Auto robots.txt
├── components/
│   ├── ads/               # AdSense components
│   ├── ui/                # Reusable UI components
│   └── layout/            # Layout wrapper
├── lib/
│   ├── config.ts          # Site config, categories
│   └── listings.ts        # Listing data & queries
├── types/                 # TypeScript interfaces
└── globals.css            # Tailwind + custom styles
```

## Customization

- **Styling**: Edit `tailwind.config.ts` and `globals.css`
- **Categories**: Modify `src/lib/config.ts`
- **Listings**: Replace `src/lib/listings.ts` with DB/CMS integration
- **Ad Slots**: Add/remove in `siteConfig.adsense.slots`

## License

MIT — use freely for your own directory projects.