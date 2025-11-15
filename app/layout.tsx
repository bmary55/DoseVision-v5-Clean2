\import "./globals.css";
import TopNav from "@/components/TopNav";

export const metadata = {
  title: "DoseVision",
  description: "Dose Ordering Optimization + Regulatory Compliance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F5F7FA] text-[#0A1A2F]">
        <TopNav />
        <main className="max-w-7xl mx-auto px-6 pt-10">{children}</main>
      </body>
    </html>
  );
}
