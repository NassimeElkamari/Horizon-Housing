import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import bcrypt from 'bcryptjs'
import CredentialsProvider from "next-auth/providers/credentials";
import {Account , User as Authuser} from "next-auth";
import { get } from "http";

export const authOptions:any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' },
          },
        async authorize(credentials:any){
            await connect();
            try {
                const user = await User.findOne({email:credentials.email});
                if(user){
                    const isPasswordRight = await bcrypt.compare(credentials.password, user.password);
                    if(isPasswordRight){
                        return user;
                    }
                }
            } catch (error:any) {
                throw new Error(error)
            }
        }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
}

export const handler = NextAuth(authOptions);
export  {handler as GET , handler as POST};