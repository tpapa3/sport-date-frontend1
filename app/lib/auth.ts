import { NextAuthOptions }from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions  = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            
            name: "Credentials",
        
            credentials: {
                username: { label: "Email address", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                
                if (
                    credentials?.username === "asfadf@gmail.com" &&
                    credentials?.password === "asfaddfaf%asdA2"
                ) {
                    return { id: "1", name: "Test User", email: credentials.username };
                }
                throw new Error("Invalid username or password");
            }
        })
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, account }) {
            
            if (account) {
                token.accessToken = account.access_token;
            }
            
            return token
        },
        async session({ session,token }) {
            session.user = token
           
            return session
        }
    }
}