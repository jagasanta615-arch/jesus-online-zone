import { OrderModal } from "@/components/OrderModal";
import { categoryLabels, servicesData } from "@/data/servicesData";
import type { Service } from "@/types";
import {
  Accessibility,
  Baby,
  Banknote,
  Box,
  Briefcase,
  Camera,
  CreditCard,
  Download,
  Edit,
  FileBadge,
  FileImage,
  FileText,
  Fingerprint,
  Globe,
  Grid,
  Home as HomeIcon,
  IdCard,
  Image,
  IndianRupee,
  Keyboard,
  Landmark,
  Layers,
  Mail,
  MapPin,
  Monitor,
  PenTool,
  Phone,
  Printer,
  ScanLine,
  Search,
  ShieldCheck,
  ShoppingBasket,
  Smartphone,
  UploadCloud,
  UserCheck,
  UserPlus,
  Vote,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// ── Icon registry ────────────────────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  Accessibility,
  Baby,
  Box,
  Briefcase,
  Camera,
  CreditCard,
  Download,
  Edit,
  FileImage,
  FileText,
  FileBadge,
  Fingerprint,
  Globe,
  Grid,
  Home: HomeIcon,
  IdCard,
  Image,
  IndianRupee,
  Keyboard,
  Landmark,
  Layers,
  Monitor,
  PenTool,
  Printer,
  ScanLine,
  Search,
  ShoppingBasket,
  Smartphone,
  UserCheck,
  UserPlus,
  Vote,
};

// ── Color maps ───────────────────────────────────────────────────────────────
const iconBgMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  orange: "bg-orange-50 text-orange-600",
  slate: "bg-slate-100 text-slate-600",
  purple: "bg-purple-50 text-purple-600",
};

const badgeBgMap: Record<string, string> = {
  blue: "bg-blue-600 text-white",
  green: "bg-emerald-600 text-white",
  orange: "bg-orange-500 text-white",
  slate: "bg-slate-500 text-white",
  purple: "bg-purple-600 text-white",
};

// ── ServiceCard ──────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  onOrder,
}: {
  service: Service;
  onOrder: (name: string) => void;
}) {
  const Icon = iconMap[service.icon];
  const iconClass = iconBgMap[service.color] ?? iconBgMap.blue;
  const badgeClass = badgeBgMap[service.color] ?? badgeBgMap.blue;
  const label = categoryLabels[service.category] ?? service.category;

  return (
    <div
      data-ocid="service-card"
      className="group relative bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center elevation-sm hover:-translate-y-1 hover:elevation-lg transition-smooth"
    >
      {/* Category badge */}
      <span
        className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${badgeClass}`}
      >
        {label}
      </span>

      {/* Icon circle */}
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-smooth group-hover:scale-110 ${iconClass}`}
      >
        {Icon ? <Icon className="h-8 w-8" /> : <Globe className="h-8 w-8" />}
      </div>

      <h3 className="font-bold text-base mb-1 text-foreground leading-tight">
        {service.name}
      </h3>
      <p className="text-xs text-muted-foreground mb-4 line-clamp-2 flex-1">
        {service.description}
      </p>

      <button
        type="button"
        data-ocid="service-order-btn"
        onClick={() => onOrder(service.name)}
        className="mt-auto w-full py-2 border-2 border-primary text-primary rounded-lg font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-smooth"
      >
        Order Now
      </button>
    </div>
  );
}

// ── Home page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState("");

  const openModal = useCallback((serviceName = "") => {
    setModalService(serviceName);
    setModalOpen(true);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ service?: string }>;
      openModal(custom.detail?.service ?? "");
    };
    window.addEventListener("openOrderModal", handler);
    return () => window.removeEventListener("openOrderModal", handler);
  }, [openModal]);

  const filtered = servicesData.filter((s) => {
    const matchText = s.name.toLowerCase().includes(searchText.toLowerCase());
    const matchCat = categoryFilter === "All" || s.category === categoryFilter;
    return matchText && matchCat;
  });

  return (
    <>
      {/* Custom blue scrollbar */}
      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #2563eb; }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="gradient-hero text-primary-foreground py-16 lg:py-24"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            All Online Work &amp; Digital Services
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            From Government Certificates and Banking to Graphic Design and
            Printing. Upload your documents and order from the comfort of your
            home.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#services"
              data-ocid="hero-explore-btn"
              className="bg-card text-primary px-8 py-3 rounded-lg font-bold hover:bg-card/90 transition-smooth shadow-elevation-md"
            >
              Explore Services
            </a>
            <button
              type="button"
              data-ocid="hero-upload-btn"
              onClick={() => openModal()}
              className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-smooth shadow-elevation-md flex items-center justify-center gap-2"
            >
              <UploadCloud className="h-5 w-5" />
              Upload Documents
            </button>
          </div>
        </div>
      </section>

      {/* ── Search & Filter bar ───────────────────────────────────────── */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-card border border-border rounded-lg shadow-elevation-md max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center p-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
            <input
              type="text"
              data-ocid="search-input"
              placeholder="Search for 'Aadhaar', 'Design', 'Pan Card'…"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              aria-label="Search services"
              className="w-full pl-9 pr-4 py-2.5 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <select
            data-ocid="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by category"
            className="w-full md:w-52 p-2.5 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="All">All Categories</option>
            <option value="Government">Government Services</option>
            <option value="Banking">Banking &amp; Finance</option>
            <option value="Printing">Printing &amp; Xerox</option>
            <option value="Design">Design &amp; Software</option>
            <option value="Jobs">Jobs &amp; Education</option>
          </select>
        </div>
      </div>

      {/* ── Services Grid ─────────────────────────────────────────────── */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
            Our Services
          </h2>

          {filtered.length === 0 ? (
            <div
              data-ocid="no-services"
              className="text-center py-16 text-muted-foreground"
            >
              <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No services found.</p>
              <p className="text-sm mt-1">
                Try a different keyword or category.
              </p>
            </div>
          ) : (
            <div
              data-ocid="services-grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((service) => (
                <ServiceCard
                  key={service.name}
                  service={service}
                  onOrder={openModal}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────── */}
      <section className="py-16 bg-blue-50/60">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-foreground">
            Why Choose Jesus Online Zone?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Zap,
                bg: "bg-blue-100",
                color: "text-blue-600",
                title: "Fast Processing",
                desc: "We prioritize urgent applications and ensure quick turnaround times.",
              },
              {
                icon: ShieldCheck,
                bg: "bg-green-100",
                color: "text-green-600",
                title: "Secure & Private",
                desc: "Your documents and personal data are handled with the highest security.",
              },
              {
                icon: Banknote,
                bg: "bg-orange-100",
                color: "text-orange-600",
                title: "Affordable Rates",
                desc: "Competitive pricing for printing, scanning, and online application fees.",
              },
            ].map(({ icon: Icon, bg, color, title, desc }) => (
              <div
                key={title}
                className="p-6 bg-card rounded-xl elevation-sm hover:elevation-md transition-smooth"
              >
                <div
                  className={`${bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className={`h-8 w-8 ${color}`} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact info (supplemental) ───────────────────────────────── */}
      <section id="contact-info" className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">
                Jesus Online Zone
              </h3>
              <p className="mb-4 text-sm text-slate-400">
                Your trusted partner for all digital, government, and design
                services.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>Main Market Road, City Center</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>support@jesusonlinezone.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#home"
                    className="hover:text-white transition-smooth"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-white transition-smooth"
                  >
                    All Services
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openModal()}
                    className="hover:text-white transition-smooth"
                  >
                    Upload Documents
                  </button>
                </li>
                <li>
                  <span className="text-slate-400">Track Application</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-bold mb-4">
                Opening Hours
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between gap-4">
                  <span>Mon – Sat:</span>
                  <span className="text-white">9:00 AM – 9:00 PM</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Sunday:</span>
                  <span className="text-white">10:00 AM – 2:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-6 text-center text-xs text-slate-500">
            © 2025 Jesus Online Zone. All Rights Reserved.
          </div>
        </div>
      </section>

      {/* ── Order Modal ───────────────────────────────────────────────── */}
      <OrderModal
        isOpen={modalOpen}
        initialService={modalService || null}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
