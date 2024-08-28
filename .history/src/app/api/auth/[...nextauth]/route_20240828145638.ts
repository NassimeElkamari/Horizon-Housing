import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import knex from 'knex';
import knexfile from '../../../../knexfile';

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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

export async function GET(request: Request) {
  return NextAuth(request, authOptions);
}

export async function POST(request: Request) {
  return NextAuth(request, authOptions);
}
