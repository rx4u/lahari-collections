import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Template Hub Configurator',
  description: 'Visual site configuration editor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
