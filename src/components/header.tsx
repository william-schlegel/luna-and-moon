import Link from 'next/link';
import React from 'react';

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@/app/(auth)/signedIn';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

import Logo from './logo';
import Role, { IsArtistOrAdmin, IsUser } from './role';
import { Button } from './ui/button';

function Header() {
  return (
    <div className="grid h-min grid-cols-[auto_1fr_auto] p-2">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>
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
          <IsArtistOrAdmin>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </IsArtistOrAdmin>
          <IsUser>
            <NavigationMenuItem>
              <Link
                href="/dashboard/change-subscription"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Changer de plan
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </IsUser>
        </NavigationMenuList>
      </NavigationMenu>
      <SignedOut>
        <Button variant="outline">
          <SignInButton />
        </Button>
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
