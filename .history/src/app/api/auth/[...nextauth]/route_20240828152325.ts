import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { SQLiteAdapter } from "@next-auth/sqlite3-adapter";
import { createConnection } from "sqlite3";

// Create a connection to your SQLite database
const db = createConnection({
  filename: './database.sqlite',
  driver: sqlite3.Database
});

export default NextAuth({
  providers: [
    Providers.Credentials({
      // The credentials are used to generate a session
      async authorize(credentials) {
        const user = { id: 1, name: "Admin", email: "admin@example.com" };

        // You can add your own logic to validate credentials
        // Example: Find the user in the database and validate the password
        // if (validateUser(credentials)) {
        return Promise.resolve(user);
        // }
        // return null;
      }
    })
  ],
  adapter: SQLiteAdapter(db),
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.SECRET,
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
  },
});
