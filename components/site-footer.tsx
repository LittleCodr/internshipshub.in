import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-500">
        <div className="flex flex-wrap gap-4">
          <Link href="/about" className="hover:text-primary-600">
            About
          </Link>
          <Link href="/contact" className="hover:text-primary-600">
            Contact
          </Link>
          <Link href="/privacy-policy" className="hover:text-primary-600">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-primary-600">
            Terms
          </Link>
          <Link href="/disclaimer" className="hover:text-primary-600">
            Disclaimer
          </Link>
        </div>
        <p className="text-xs">© {new Date().getFullYear()} InternshipsHub Media Network.</p>
      </div>
    </footer>
  );
}
