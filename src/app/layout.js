import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "DashFreela",
  description: "Um dashboard para aumentar a produtividade de freelancers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
