import { NextAuthOptions } from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import GoogleProviders from "next-auth/providers/google";

interface AuthUser {
  id: string;
  email: string;
  accessToken?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProviders({
      // ! tells the ts that this value might look like it could be undefined, but at runtime it wont.
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProviders({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.email && !credentials?.password) return null;
        try {
          // when the user wants to log in
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SPRING_BASE_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              credentials: "include",
            }
          );

          console.log("Response status: ", res);

          if (!res.ok) {
            const text = await res.text();
            console.log("Login failed response text: ", text);
            return null;
          }

          const user = await res.json();

          console.log("User from backend: ", user);

          if (!user?.id || !user.email) return null;

          return {
            id: user.id,
            email: user.email,
            accessToken: user.accessToken,
          };
        } catch (error) {
          console.error("Credentials auth error: ", error);
          return null;
        }
      },
    }),
  ],

  // instead of storing session in DB, we are using JSON Web Token to keep the session state
  // our token from backend will be stored in cookies
  session: {
    strategy: "jwt",
  },

  callbacks: {
    // token - the spring generated token
    // account - credentials and oAuth info
    // user - basic profile from provider or authorize
    // profile - full profile data from provider

    // handles authentication
    async jwt({ token, account, user, profile }) {
      // how the frontend will send the spring jwt via nextauth so the whole chain is working

      // if user is already logged via Credentials (Spring boot login)
      if (user?.accessToken) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
        return token;
      }

      // if user logged in via Google OAuth
      if (account && profile && !token.accessToken) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SPRING_BASE_URL}/auth/oauth-login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: profile.email,
                provider: account.provider,
                providerId: account.providerAccountId,
              }),
              credentials: "include", // important to include cookies
            }
          );

          const springUsr = await res.json();

          if (res.ok && springUsr.accessToken) {
            token.accessToken = springUsr.accessToken;
            token.email = springUsr.email;
            token.id = springUsr.id;
          }
        } catch (error) {
          console.error("OAuth → Spring exchange failed", error);
        }
      }

      return token;
    },

    // handles the session so that you can your backend from any page
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },

  },

  secret: process.env.NEXTAUTH_SECRET,
};
