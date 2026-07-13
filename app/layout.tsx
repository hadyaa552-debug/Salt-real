import type { Metadata } from "next";
import "./globals.css";

/* ── Tracking ─────────────────────────────────────────── */
const GA_ID = "AW-XXXXXXXXXX"; // Google Ads ID — replace
const FB_PIXEL = "XXXXXXXXXXXXXXXXX"; // Facebook Pixel — replace

export const metadata: Metadata = {
  title: "SALT Marina — Ras El Hekma | Tatweer Misr",
  description:
    "SALT Marina by Tatweer Misr — a licensed yacht marina at Km 185, Ras El Hekma. Studios, chalets and town houses from EGP 8M. Register now for priority access.",
  openGraph: {
    title: "SALT Marina — Where Two Waterfronts Meet",
    description:
      "Tatweer Misr's second marina at Ras El Hekma. Mediterranean meets Crystal Lagoons. Registration open.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&family=Cairo:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Google Ads gtag */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />

        {/* Facebook Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
