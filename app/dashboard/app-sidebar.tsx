import { Circle, Sheet, Stars, User, User2, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { IsAdmin, IsArtistOrAdmin } from '@/components/role';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from '@/components/ui/menubar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from '@/components/ui/sidebar';

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
    <Sidebar>
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <IsArtistOrAdmin>
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
        <SidebarMenu>
          <SidebarMenuItem>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Mon compte</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Link
                      href="/dashboard/my-account/profile"
                      legacyBehavior
                      passHref
                    >
                      <ForwardedSideBarLink
                        libelle="Mon profile"
                        icon={<User2 />}
                      />
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link
                      href="/dashboard/my-account/account"
                      legacyBehavior
                      passHref
                    >
                      <ForwardedSideBarLink
                        libelle="Mon compte"
                        icon={<UserCircle2 />}
                      />
                    </Link>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

interface SideBarLinkProps {
  libelle: string;
  icon: React.ReactNode;
}

// Use React.ForwardRefRenderFunction to properly type the forwarded ref
const SideBarLink: React.ForwardRefRenderFunction<
  HTMLAnchorElement,
  SideBarLinkProps
> = ({ libelle, icon }, ref) => {
  return (
    <SidebarMenuButton asChild>
      <a ref={ref}>
        {icon}
        <span>{libelle}</span>
      </a>
    </SidebarMenuButton>
  );
};

const ForwardedSideBarLink = React.forwardRef(SideBarLink);
