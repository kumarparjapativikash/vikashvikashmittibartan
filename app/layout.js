import "./globals.css";

export const metadata = {
  title: "Vikash Vikash Mitti Bartan",
  description: "मिट्टी के बर्तन और पारंपरिक उत्पाद — Bishanpura, Chapra, Bihar"
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
