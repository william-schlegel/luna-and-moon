import { currentUser } from '@clerk/nextjs/server';
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

import { NavUser } from './nav-user';
import ForwardedSideBarLink from './sidebar-link';

const artistMenu = [
  {
    title: 'Oeuvres',
    url: '/dashboard/artistes',
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
  const user = await currentUser();
  if (!user) return null;
  const email =
    user.primaryEmailAddress?.emailAddress ?? user.primaryEmailAddress ?? '';

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
            email: email as string,
            name: user.fullName ?? ''
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
