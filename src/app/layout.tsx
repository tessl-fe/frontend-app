import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'TeamFlow', description: 'Team productivity dashboard' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
