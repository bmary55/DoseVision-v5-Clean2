"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "Dose Ordering", href: "/optimize" },
  { name: "Schedule", href: "/optimize/schedule" },
  { name: "Vendors", href: "/optimize/vendors" },
  { name: "Health Insurance", href: "/optimize/insurance" },
  { name: "Dose Credits", href: "/optimize/credits" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <>
      {/* TOP BAR WITH LOGO */}
      <div className="w-full flex items-center gap-4 py-4 px-6 border-b bg-white">
        <Image
          src="/logo.png"      // <-- You must upload your logo as /public/logo.png
          alt="DoseVision Logo"
          width={48}
          height={48}
        />
        <span className="text-3xl font-semibold text-[#0A1A2F]">
          DoseVision
        </span>
      </div>

      {/* SECONDARY NAVIGATION BAR */}
      <div className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto flex gap-12 px-6">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-5 text-lg font-medium ${
                  active ? "text-[#0A1A2F]" : "text-gray-500"
                } relative`}
              >
                {item.name}

                {/* ACTIVE TAB UNDERLINE */}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-[2px] h-[3px] bg-[#0A1A2F] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
