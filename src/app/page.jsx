import App from "../components/Task";
// import { auth } from "/auth.js"
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";

export default async function Home({ children, session }) {
  return (
    <SessionProvider session={session}>
      <main className="flex min-h-screen flex-col items-center justify-between">
        {/* <p>Welcome {session?.user.name}!</p> */}
        <Header />
        <App />
        {children}
      </main>
    </SessionProvider>
  );
}
