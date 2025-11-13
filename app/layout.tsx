export const metadata = { title: "DoseVision", description: "Dose ordering and regulatory" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto px-4">
          {children}
        </div>
        <style jsx global>{`
          :root{ --primary:#0a2342;}
          body{ background:#f7f7f8; color:#0f172a; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji; }
          .container{ max-width: 1200px; }
          .card{ background:white; border:1px solid #e2e8f0; border-radius:16px; padding:16px; }
          .btn{ border-radius:999px; padding:8px 14px; border:1px solid #cbd5e1; }
          .btn-primary{ background:var(--primary); color:white; border-color:transparent; }
          .btn-secondary{ background:white; color:#0f172a; }
          .pill{ background:white; border:1px solid #e2e8f0; border-radius:999px; padding:16px; }
          .tabs a{ padding:8px 12px; display:inline-block; }
        `}</style>
      </body>
    </html>
  );
}
