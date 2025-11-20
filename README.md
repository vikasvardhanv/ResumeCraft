# Resume Craft Landing Page

Production-ready landing page for the Resume Craft Chrome extension.

## 🚀 Features

- **Modern Design**: Clean, professional UI with gradient accents
- **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- **Fast Loading**: Pure HTML/CSS/JS, no frameworks = instant load times
- **SEO Optimized**: Meta tags, semantic HTML, proper structure
- **Accessibility**: ARIA labels, keyboard navigation, screen reader friendly
- **Browser Detection**: Detects Chrome and shows appropriate messaging
- **Modal Installation Guide**: Step-by-step instructions for users
- **Premium Endpoint**: `/premium` serves the Stripe-powered subscription flow separate from the landing page

## 📁 Structure

```
ResumeCraft/
├── api/
│   ├── create-checkout-session.js # Stripe serverless endpoint
│   ├── premium.js                 # Serves resumecraft.dev/premium
│   └── site.js                    # Serves the landing page
├── templates/
│   ├── premium.html               # Premium subscription page
│   └── resumecraft.html           # Landing page template
├── styles.css                     # Shared styles
├── vercel.json                    # Routes / rewrites for resumecraft.dev
└── README.md
```

## 🎨 Customization

### Update Chrome Web Store URL


Once your extension is published, update the URL in `templates/resumecraft.html` (search for `CHROME_STORE_URL` inside the inline script):

```javascript
const CHROME_STORE_URL = 'https://chrome.google.com/webstore/detail/resume-tailor/YOUR_EXTENSION_ID';
```

### Change Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary: #4F46E5;        /* Main brand color */
    --primary-dark: #4338CA;   /* Hover states */
    --secondary: #10B981;      /* Accent color */
    /* ... other colors ... */
}
```

### Add Analytics

Add your tracking code inside the inline script block at the bottom of `templates/resumecraft.html`:

```javascript
function trackEvent(action, label) {
    // Google Analytics example:
    gtag('event', action, { 'event_label': label });
    
    // Or Plausible:
    plausible(action, { props: { label } });
}
```

## 🌐 Deployment

### Deploy to Vercel

This repo is configured as a Node-powered Vercel app. The `vercel.json` routes `/` to `api/site.js` (landing page), `/premium` to `api/premium.js`, and `/create-checkout-session` to the Stripe serverless function.

1. Install the Vercel CLI if you haven't already:
   ```bash
   npm install -g vercel
   ```
2. Log in and link to your project:
   ```bash
   vercel link   # or 'vercel' to deploy directly
   ```
3. Set your required env vars (at minimum `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, and `STRIPE_PUBLISHABLE_KEY` for the inline script).
4. Deploy:
   ```bash
   vercel --prod
   ```

Your domain (e.g. https://resumecraft.dev) can then be pointed at the Vercel project.


## 🛠 How to Run Locally

The quickest way to preview locally is with `vercel dev`, which emulates the production serverless environment:

```bash
npm install
npm run dev
```

By default Vercel serves the site at `http://localhost:3000`.

## 📝 TODO Before Launch

- [ ] Update Chrome Web Store URL in `templates/resumecraft.html`
- [ ] Add your logo/favicon
- [ ] Configure analytics tracking in the inline script block
- [ ] Add privacy policy and terms pages
- [ ] Test on multiple browsers and devices
- [ ] Set up custom domain (optional)
- [ ] Add structured data for SEO
- [ ] Create OG images for social sharing

## 🎯 SEO Checklist

✅ Semantic HTML structure
✅ Meta descriptions
✅ Open Graph tags
✅ Mobile-friendly
✅ Fast loading
✅ Accessible (WCAG compliant)
✅ Valid HTML/CSS

## 📧 Support

For questions or issues, contact: support@resumecraft.dev

## 📄 License

Same license as the main Resume Craft project.
