import './globals.css';

export const metadata = {
  title: 'Stars on the River — Riviercruise 19–21 maart 2027',
  description: 'Een muzikale riviercruise aan boord van de MS Viva Moments, 19–21 maart 2027.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Italiana&family=Karla:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Karla',sans-serif", background: '#0b1524', color: '#e8e4da', minHeight: '100vh', fontWeight: 300 }}>
        {children}
      </body>
    </html>
  );
}
