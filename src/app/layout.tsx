import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo App",
  description: "WTF is a server component",
};

type Props = {
  children: React.ReactNode;
};

const CONTAINER_CLASSES = "max-w-screen-md mx-auto p-2";

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-black text-white border-white">
        <nav className="sticky bg-slate-800">
          <div className={CONTAINER_CLASSES}>Todo App</div>
        </nav>
        <div className={CONTAINER_CLASSES}>{children}</div>
      </body>
    </html>
  );
}
