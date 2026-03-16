# Google Search Console Setup

Follow these steps to connect TrackrAI to Google Search Console.

## Steps

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Click "Add property".
3. Select "URL prefix" and enter `https://trackrai.io`.
4. Click "Continue".
5. Choose "HTML tag" as the verification method.
6. Copy the value from the `content=""` attribute of the meta tag shown.
   - Example tag: `<meta name="google-site-verification" content="abc123XYZ" />`
   - Copy only: `abc123XYZ`
7. Add it to your `.env.local` file:
   ```
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123XYZ
   ```
8. Deploy the site to production.
9. Return to Search Console and click "Verify".
10. After verification, submit the sitemap:
    - Go to Sitemaps in the left menu.
    - Enter: `https://trackrai.io/sitemap.xml`
    - Click "Submit".

## Notes

- The verification meta tag is already wired up in `app/layout.tsx`.
- The sitemap is auto-generated at `https://trackrai.io/sitemap.xml`.
- The robots.txt is at `https://trackrai.io/robots.txt`.
