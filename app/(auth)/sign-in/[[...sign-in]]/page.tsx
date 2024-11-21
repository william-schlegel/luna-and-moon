import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="grid min-h-screen w-full place-items-center">
      <SignIn />;
    </div>
  );
}
