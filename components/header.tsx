import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

import Logo from './logo';
import Role, { IsAdmin } from './role';

function Header() {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] py-2">
      <Logo />
      <NavigationMenu className="mx-auto gap-8">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/galeries" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Galeries
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/events" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Evénements
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <IsAdmin>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </IsAdmin>
        </NavigationMenuList>
      </NavigationMenu>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-4">
          <Role />
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}

export default Header;
