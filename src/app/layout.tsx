import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Animation } from "./_components/Animation";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Arcadia Tools",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const messages = await getMessages();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-[#111827]">
        <NextIntlClientProvider messages={messages}>
          <Animation>
            <main className="flex min-h-screen flex-col items-center text-white before:pointer-events-none before:fixed before:inset-0 before:block before:h-full before:w-full before:bg-[url('/assets/background-pattern.svg')] before:bg-cover before:bg-no-repeat before:opacity-5">
              <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20 pointer-events-none"><div className="blur-[106px] h-56 bg-gradient-to-br to-purple-400 from-blue-700"></div><div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 :to-indigo-600"></div></div>
              {children}
            </main>
          </Animation>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
