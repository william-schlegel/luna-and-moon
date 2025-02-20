import { Circle, Sheet, Stars, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { IsAdmin, IsArtistOrAdmin } from '@/components/role';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { getActualUser } from '@/lib/auth';

import { NavUser } from './nav-user';
import ForwardedSideBarLink from './sidebar-link';

const artistMenu = [
  {
    title: 'Oeuvres',
    url: '/dashboard/arts',
    icon: Stars
  }
];

const adminMenu = [
  {
    title: 'Artistes',
    url: '/dashboard/artistes',
    icon: User
  },
  {
    title: 'Catégories',
    url: '/dashboard/cotegories',
    icon: Sheet
  },
  {
    title: 'Matériaux',
    url: '/dashboard/materials',
    icon: Circle
  }
];

export async function AppSidebar() {
  const user = await getActualUser();
  if (!user) return null;
  const email = user.email;

  return (
    <Sidebar collapsible="icon" className="min-h-screen">
      <SidebarContent>
        <IsArtistOrAdmin>
          <SidebarTrigger />
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {artistMenu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url} legacyBehavior passHref>
                      <ForwardedSideBarLink
                        libelle={item.title}
                        icon={<item.icon />}
                      />
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </IsArtistOrAdmin>
        <IsAdmin>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminMenu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url} legacyBehavior passHref>
                      <ForwardedSideBarLink
                        libelle={item.title}
                        icon={<item.icon />}
                      />
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </IsAdmin>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            id: user.id,
            email,
            name: user.name ?? ''
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
