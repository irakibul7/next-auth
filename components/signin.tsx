'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function SignIn() {
  const router = useRouter();
  const email = useRef('');
  const password = useRef('');

  const [requiredError, setRequiredError] = useState({
    emailReq: false,
    passReq: false,
  });

  const handleSubmit = async (
    e?: React.FormEvent<HTMLButtonElement>
  ) => {
    if (e) {
      e.preventDefault();
    }
    if (!email.current || !password.current) {
      setRequiredError({
        emailReq: email.current ? false : true,
        passReq: password.current ? false : true,
      });
      return;
    }

    console.log(password.current);
    const res = await signIn('credentials', {
      email: email.current,
      password: password.current,
      redirect: false,
    });

    if (!res?.error) {
      router.push('/');
    } else {
      console.log('error', res.error);
      setRequiredError((prevState) => ({
        ...prevState,
        emailReq: false,
      }));
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full sm:max-w-md bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Login to your account
          </h1>
          <form action="#" className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                onChange={(e) => {
                  setRequiredError((prevState) => ({
                    ...prevState,
                    emailReq: false,
                  }));
                  email.current = e.target.value;
                }}
              />
              {requiredError.emailReq && (
                <span className=" text-red-500">
                  Email is required
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setRequiredError((prevState) => ({
                    ...prevState,
                    passReq: false,
                  }));
                  password.current = e.target.value;
                }}
              />
              {requiredError.passReq && (
                <span className=" text-red-500">
                  Password is required
                </span>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
