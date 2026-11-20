VEGAM WEBSITE
=============

Pages
  index.html     Home page
  terms.html     Terms of Service
  privacy.html   Privacy Policy (account deletion: privacy.html#delete-account)
  contact.html   Contact and company details

Shared files
  styles.css     All colours, fonts and layout (brand colours are at the top)
  script.js      Links you can change in one place (see below) + mobile menu
  assets/        Logo files and service illustrations

CHANGE THE WAITLIST OR INSTAGRAM LINK
  Open script.js and edit the top lines:
    waitlist:  "paste your Google Form link here"
    instagram: "https://www.instagram.com/vegam.services/"
  While waitlist is empty, "Join the waitlist" opens WhatsApp instead.

WHEN THE APP IS LIVE
  In index.html, find the STORE BUTTONS comment and follow its 3 steps.

STILL TO FILL IN (highlighted in yellow on privacy.html)
  Hosting provider and server location, SMS/OTP provider, analytics tool,
  data retention period, phone-number masking, Malayalam version.

PUT IT ONLINE (free)
  1. Go to app.netlify.com/drop and drag this whole folder onto the page.
  2. In Netlify: Domain management -> Add a domain -> type your domain.
  3. At your domain provider's DNS settings, add the records Netlify shows
     (usually: A record  @  -> 75.2.60.5   and   CNAME  www -> yoursite.netlify.app).
     Do not delete MX or TXT records - those are for email.
