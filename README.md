# Vikash Vikash Mitti Bartan — Vercel Website

इस project में:
- Premium responsive public website
- अलग `/admin` login page
- Admin से image upload
- Title + caption के साथ post publish
- Published posts homepage पर automatically दिखती हैं
- Post delete option
- Supabase database + Storage
- Vercel-ready Next.js project

## 1. Supabase बनाएं

Supabase में नया project बनाएं।
SQL Editor में `supabase.sql` का पूरा code run करें।

फिर Storage → New bucket:
- Name: `posts`
- Public bucket: ON

## 2. Environment variables

`.env.example` को `.env.local` नाम दें और values भरें:

NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_PASSWORD=अपना-strong-password
SESSION_SECRET=एक-लंबा-random-secret

बाकी values अपनी जरूरत के अनुसार बदलें।

IMPORTANT:
`SUPABASE_SERVICE_ROLE_KEY` कभी browser/client code में न डालें।

## 3. Local test

```bash
npm install
npm run dev
```

फिर:
- Website: http://localhost:3000
- Admin: http://localhost:3000/admin

## 4. Vercel deploy

1. इस folder को GitHub repository में upload करें।
2. Vercel में New Project → उस GitHub repo को import करें।
3. Environment Variables में `.env.local` वाली values डालें।
4. Deploy दबाएं।

Deploy के बाद:
`https://your-domain.vercel.app/admin`

## 5. अपना domain

Vercel Project → Settings → Domains → अपना domain add करें।

## Admin में पोस्ट कैसे डालें?

`/admin` खोलें → password → फोटो चुनें → title → caption → Publish Post.

फोटो Supabase Storage में जाएगी और post database में save होगी।
