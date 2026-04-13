import { Link, useLocation } from "@tanstack/react-router";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Services" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header — primary blue-900 background */}
      <header className="sticky top-0 z-50 shadow-elevation-sm bg-primary">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary-foreground hover:opacity-90 transition-smooth"
          >
            <Globe className="h-8 w-8 opacity-70" />
            <div>
              <h1 className="text-xl font-bold leading-none">
                Jesus Online Zone
              </h1>
              <p className="text-xs opacity-60">Your Digital Service Partner</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            {isAdmin ? (
              <Link
                to="/"
                className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground px-4 py-2 rounded-full font-semibold text-sm transition-smooth"
              >
                ← Back to Site
              </Link>
            ) : (
              <Link
                to="/admin"
                className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground px-4 py-2 rounded-full font-semibold text-sm transition-smooth"
              >
                Admin
              </Link>
            )}
            <button
              type="button"
              data-ocid="nav-order-now"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("openOrderModal"))
              }
              className="bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-smooth shadow-elevation-sm"
            >
              Order Now
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden text-primary-foreground p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-secondary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-secondary-foreground/80 hover:text-secondary-foreground hover:bg-secondary-foreground/10 transition-smooth text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 py-3">
              <button
                type="button"
                data-ocid="mobile-order-now"
                onClick={() => {
                  setMobileOpen(false);
                  window.dispatchEvent(new CustomEvent("openOrderModal"));
                }}
                className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-sm"
              >
                Order Now
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-foreground text-primary-foreground py-12"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-primary-foreground text-xl font-bold mb-4">
                Jesus Online Zone
              </h3>
              <p className="text-primary-foreground/60 mb-4 text-sm">
                Your trusted partner for digital, government, and design
                services.
              </p>
              <div className="space-y-2 text-sm text-primary-foreground/70">
                <p>📍 Main Market Road, City Center</p>
                <p>📞 +91 98765 43210</p>
                <p>✉️ support@jesusonlinezone.com</p>
              </div>
            </div>
            <div>
              <h3 className="text-primary-foreground text-lg font-bold mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li>
                  <a
                    href="/"
                    className="hover:text-primary-foreground transition-smooth"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/#services"
                    className="hover:text-primary-foreground transition-smooth"
                  >
                    All Services
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    className="hover:text-primary-foreground transition-smooth"
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("openOrderModal"))
                    }
                  >
                    Upload Documents
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-primary-foreground text-lg font-bold mb-4">
                Opening Hours
              </h3>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li className="flex justify-between">
                  <span>Mon – Sat:</span>
                  <span>9:00 AM – 9:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>10:00 AM – 2:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/50">
            <p>
              © {new Date().getFullYear()} Jesus Online Zone. Built with love
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                className="hover:text-primary-foreground transition-smooth underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
