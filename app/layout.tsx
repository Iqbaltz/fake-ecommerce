import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import AuthProvider from "./AuthProvider";
import NavMenu from "./NavMenu";
import { ReduxProvider } from "@/redux/provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "300"],
});

export const metadata: Metadata = {
  title: "Fake E-Commerce App",
  description: "by iqbal",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <AuthProvider session={session}>
      <html lang="en">
        <ReduxProvider>
          <body className={inter.className}>
            <NavMenu />
            {children}
            <ToastContainer />
          </body>
        </ReduxProvider>
      </html>
    </AuthProvider>
  );
}
