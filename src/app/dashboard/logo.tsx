'use client';

import { useSidebar } from '@/components/ui/sidebar';

export default function Logo() {
  const { state } = useSidebar();

  if (state === 'collapsed') return null;
  return (
    <div className="flex-1 rounded-sm bg-green-200 p-2 text-center text-black">
      <div>L&M</div>
    </div>
  );
}
