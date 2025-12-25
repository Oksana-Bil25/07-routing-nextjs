import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Notes App",
  description: "Created by Oksana",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}

          {modal}

          <div id="modal-root" />
        </Providers>
      </body>
    </html>
  );
}
