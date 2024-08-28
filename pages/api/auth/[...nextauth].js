import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'Ov23liRA6DqgHQNKY4cM',
      clientSecret: '5d857f91b23fae85385c4e6fcdd7d894c4083c05',
    }),
  ],
  secret : 'ddllv8221845zzs766772cbf',
  adapter : MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions); 