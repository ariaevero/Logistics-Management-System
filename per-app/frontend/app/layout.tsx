import '../styles/globals.css';
import type { ReactNode } from 'react';
import Providers from './providers';

export const metadata = {
  title: 'Nigerian Navy PER 206 - Digital Form',
  description: 'Seven-page interactive Nigerian Navy Performance Evaluation Report (PER 206).'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-navy-50 text-navy-700 min-h-screen">
        <Providers>
          <main className="max-w-5xl mx-auto py-10 px-4 lg:px-0">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
