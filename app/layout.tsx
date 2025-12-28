import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Providers } from "./providers"; // 1. Імпортуємо провайдери
import "./globals.css";

export default function RootLayout({
  children,
  modal, // 2. ДОДАЄМО: проп для паралельного маршруту (модалки)
}: {
  children: React.ReactNode;
  modal: React.ReactNode; // 3. Типізуємо модалку
}) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        {/* 4. ОБГОРТАЄМО все в Providers (Завдання 8) */}
        <Providers>
          <Header />
          <main style={{ flex: "1 0 auto" }}>{children}</main>

          {/* 5. ВИВОДИМО слот для модалки (Завдання 10/11) */}
          {modal}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
