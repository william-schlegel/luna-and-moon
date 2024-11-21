import { ClerkProvider } from '@clerk/nextjs';

import Header from '@/components/header';
import { SidebarProvider } from '@/components/ui/sidebar';

import './globals.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SidebarProvider>
            <div className="grid w-full grid-rows-[auto_1fr]">
              <Header />
              <div className="w-full">{children}</div>
            </div>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
