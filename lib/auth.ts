import axios from 'axios';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { cookies } from 'next/headers';

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: '' },
        password: {
          label: 'password',
          type: 'password',
          placeholder: '',
        },
      },
      async authorize(credentials: any, req) {
        const res = await axios.post(
          `${process.env.API_URL}/api/v1/desktop/login`,
          {
            email: credentials.email,
            password: credentials.password,
          },
          {
            withCredentials: true,
          }
        );

        const { user, token } = await res.data;

        if (res.status === 200) {
          cookies().set('jwt', token);
          return {
            id: user._id,
            email: user.email,
            name: user.name,
            image: user.profilePic,
            token: token,
          };
        }

        throw new Error(user.message);
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }: any) => {
      return token;
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.user.id = token.uid;
      }
      return session;
    },
  },

  pages: {
    signIn: '/signin',
  },
};
