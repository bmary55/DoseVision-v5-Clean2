import Link from "next/link";
const tabs = [
  { href: "/optimize/dose-ordering", label: "Dose Ordering" },
  { href: "/optimize/schedule", label: "Schedule" },
  { href: "/optimize/vendors", label: "Vendors" },
  { href: "/optimize/insurance", label: "Health Insurance" },
  { href: "/optimize/credits", label: "Dose Credits" },
];
export default function OptimizeTabs({ active }: { active?: string }) {
  return (
    <div className="sticky top-0 z-20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-slate-200">
      <nav className="container flex gap-8">
        {tabs.map(t => (
          <Link key={t.href} href={t.href as any}
            className={`py-3 ${active===t.href ? "text-slate-900 font-medium border-b-2 border-[var(--primary)] -mb-[1px)]" : "text-slate-600 hover:text-slate-900"}`}>
            {t.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
