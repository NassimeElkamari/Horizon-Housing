import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import knex from 'knex';
import bcrypt from 'bcrypt';
import knexfile from '../../../../../knexfile';

const db = knex(knexfile.development);

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await db('users').where({ email: credentials?.email }).first();
        if (user && await bcrypt.compare(credentials?.password, user.password)) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }:any) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
