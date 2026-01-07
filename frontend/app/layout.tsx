import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}

