import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SignIn from '@/components/signin';
export default async function SigninPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/');
  }
  return <SignIn />;
}
