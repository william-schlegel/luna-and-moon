import { Circle, Sheet, Stars, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { IsAdmin } from '@/components/role';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from '@/components/ui/sidebar';

import Logo from './logo';

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

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex flex-wrap items-center gap-4">
          <Logo />
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {artistMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url} legacyBehavior passHref>
                    <ForwardedSideBarLink
                      href={item.url}
                      libelle={item.title}
                      icon={<item.icon />}
                    />
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <IsAdmin>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminMenu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url} legacyBehavior passHref>
                      <ForwardedSideBarLink
                        href={item.url}
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
    </Sidebar>
  );
}

interface SideBarLinkProps {
  href: string;
  libelle: string;
  icon: React.ReactNode;
}

// Use React.ForwardRefRenderFunction to properly type the forwarded ref
const SideBarLink: React.ForwardRefRenderFunction<
  HTMLAnchorElement,
  SideBarLinkProps
> = ({ href, libelle, icon }, ref) => {
  return (
    <SidebarMenuButton asChild>
      <a href={href} ref={ref}>
        {icon}
        <span>{libelle}</span>
      </a>
    </SidebarMenuButton>
  );
};

const ForwardedSideBarLink = React.forwardRef(SideBarLink);
