import "../styles/main.css";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "THQNAM's Blog",
  description: "This is the Blog of Thiều Huỳnh Quang Nam",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <Link className="site-brand" href="/">
              THQNAM
            </Link>
            <nav aria-label="Primary navigation">
              <Link href="/">About</Link>
              <Link href="/posts">Posts</Link>
              <Link href="/photos">Photos</Link>
            </nav>
          </header>
          <main className="site-content">{children}</main>
          <footer className="site-footer">
            <small>
              <time dateTime={String(new Date().getFullYear())}>
                {new Date().getFullYear()}
              </time>{" "}
              © Thiều Huỳnh Quang Nam.
              <Link href="https://vercel.com/">Vercel</Link>
            </small>
          </footer>
        </div>
      </body>
    </html>
  );
}