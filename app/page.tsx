import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

async function getUser() {
  const session = await getServerSession(authOptions);
  return session;
}

export default async function Home() {
  const session = await getUser();

  if (!session) {
    redirect('/signin');
  }

  const { name, email, image } = session.user;

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-white dark:bg-gray-800">
      <div className="w-full sm:max-w-md  rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700 py-8 px-4">
        <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 dark:text-white md:text-2xl">
          {name}
        </h2>
        <p className="mb-4 text-xl text-gray-900 dark:text-white font-extrabold leading-none md:text-2xl">
          {email}
        </p>
      </div>
    </section>
  );
}
