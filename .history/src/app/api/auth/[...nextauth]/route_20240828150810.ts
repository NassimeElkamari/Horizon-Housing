import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import bcrypt from 'bcryptjs'
import CredentialsProvider from "next-auth/providers/credentials";
import {Account , User as Authuser} from "next-auth";
import { get } from "http";
import knexfile from "../../../../../knexfile";
import knex from "knex";

const db = knex(knexfile.development);


export const authOptions:any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await db('users').where({ email: credentials?.email }).first();
        if (user && await bcrypt.compare(credentials!.password, user.password)) {
          return user;
        }
        return null;
      },
    }),
  ],
}

export const handler = NextAuth(authOptions);
export  {handler as GET , handler as POST};