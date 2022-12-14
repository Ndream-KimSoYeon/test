import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
// import FacebookProvider from 'next-auth/providers/facebook';
import FacebookProvider from 'next-auth/providers/facebook';
// import GithubProvider from 'next-auth/providers/github';
// import TwitterProvider from 'next-auth/providers/twitter';
// import Auth0Provider from 'next-auth/providers/auth0';
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains

    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    */
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || '',
      clientSecret: process.env.FACEBOOK_SECRET || ''
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || ''
    }),
    NaverProvider({
      clientId: process.env.NAVER_ID || '',
      clientSecret: process.env.NAVER_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID || '',
      clientSecret: process.env.KAKAO_SECRET || '',
    })
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET
    // }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   issuer: process.env.AUTH0_ISSUER
    // })
  ],
  theme: {
    colorScheme: 'light'
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      // console.log(`JWT Token: ${token.accessToken}`);
      // console.log(`User: ${JSON.stringify(user)}`);
      // console.log(`Account: ${JSON.stringify(account)}`);
      // console.log(`Token: ${JSON.stringify(token)}`);
      // console.log('uniqueId: ' + token.sub);

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      session.idaccount = token.sub;

      return session;
    }
  }
};

export default NextAuth(authOptions);
