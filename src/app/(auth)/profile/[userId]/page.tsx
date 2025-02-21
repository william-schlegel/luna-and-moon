import { notFound } from 'next/navigation';

import SignUpForm from '@/app/(auth)/_forms/signup-form';
import { getUser } from '@/server/db/users';

type ProfilePageProps = Readonly<{
  params: Promise<{
    userId: string;
  }>;
}>;

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = await params;
  if (!userId) notFound();
  const user = await getUser(userId);
  if (!user) return null;
  return (
    <SignUpForm
      profile={{
        email: user.email,
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        plan: user.tier,
        image: user.image ?? '',
        password: ''
      }}
      userId={userId}
    />
  );
}
