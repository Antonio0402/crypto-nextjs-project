import { ReactNode } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="./cryptocurrency.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create next app"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      </Head>
      <div className="flex overflow-hidden max-md:flex-col min-h-screen">
        <header className="basis-1/5 max-w-[240px] max-md:basis-full">
          <Navbar />
        </header>
        <main className="basis-4/5 grid grid-rows-[1fr,auto] min-h-[90vh] w-full min-[1100px]:ml-16 max-md:px-4 md:ml-72 max-md:basis-full max-md:mt-20 max-md:mr-2.5 max-md:ml-0">
          {children}
          <footer className="bg-slate-950 self-end flex flex-col p-5 items-center">
            <Footer />
          </footer>
        </main>
      </div>
    </>
  );
}
