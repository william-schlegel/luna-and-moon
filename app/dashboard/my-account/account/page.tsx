import { UserProfile } from '@clerk/nextjs';

const UserAccountPage = () => (
  <div className="flex w-full items-center justify-center">
    <UserProfile routing="hash" />;
  </div>
);

export default UserAccountPage;
