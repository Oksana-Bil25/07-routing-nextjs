import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer"; // Рядок 2, де була помилка
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Додаємо стилі Flexbox, щоб футер завжди був притиснутий до низу */}
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        <Header />
        {/* main займе весь вільний простір, виштовхуючи футер вниз */}
        <main style={{ flex: "1 0 auto" }}>{children}</main>
        <Footer /> {/* ОСЬ ТУТ треба було його вставити! */}
      </body>
    </html>
  );
}
