import "./globals.css";

export const metadata = {
  title: "Skinstric",
  description: "Your AI Skin Analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}