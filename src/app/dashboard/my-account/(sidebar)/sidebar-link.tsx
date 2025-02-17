import React from 'react';

import { SidebarMenuButton } from '@/components/ui/sidebar';

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
export default ForwardedSideBarLink;
