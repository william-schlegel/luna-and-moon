import Header from '@/components/header';
import { IsArtistOrAdmin } from '@/components/role';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';

import { AppSidebar } from './dashboard/my-account/(sidebar)/app-sidebar';
import './globals.css';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <IsArtistOrAdmin>
            <AppSidebar />
          </IsArtistOrAdmin>
          <div className="grid w-full grid-rows-[auto_1fr]">
            <Header />
            <div className="mx-4">{children}</div>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
