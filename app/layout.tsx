import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'S00K | The World in a Word',
  description: 'Welcome to the marketplace. S00K brings global commerce together.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts for multilingual scripts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Noto+Naskh+Arabic:wght@700&family=Noto+Sans+Devanagari:wght@700&family=Noto+Sans+KR:wght@700&family=Roboto:wght@700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #1a1a1a;
            color: #ffffff;
            font-family: 'Montserrat', system-ui, sans-serif;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
