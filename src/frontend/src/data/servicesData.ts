import type { Service } from "../types";

export const servicesData: Service[] = [
  // Government Services
  {
    name: "Caste Certificate",
    icon: "FileBadge",
    category: "Government",
    color: "blue",
    description:
      "Apply for caste certificate for government schemes and applications.",
  },
  {
    name: "Resident Certificate",
    icon: "Home",
    category: "Government",
    color: "blue",
    description:
      "Obtain official proof of residency from your local authority.",
  },
  {
    name: "Income Certificate",
    icon: "IndianRupee",
    category: "Government",
    color: "blue",
    description:
      "Income certificate for scholarships, loans, and welfare benefits.",
  },
  {
    name: "Voter ID Apply/Correction",
    icon: "Vote",
    category: "Government",
    color: "blue",
    description:
      "Apply for new Voter ID or request corrections in existing one.",
  },
  {
    name: "Pan Card (New/Update)",
    icon: "CreditCard",
    category: "Government",
    color: "blue",
    description: "Apply for PAN Card or update existing PAN Card details.",
  },
  {
    name: "Aadhaar Card Services",
    icon: "Fingerprint",
    category: "Government",
    color: "blue",
    description: "Aadhaar enrollment, corrections, and updates — all online.",
  },
  {
    name: "Employment Certificate",
    icon: "Briefcase",
    category: "Government",
    color: "blue",
    description:
      "Official certificate of employment for applications and loans.",
  },
  {
    name: "Disability Certificate",
    icon: "Accessibility",
    category: "Government",
    color: "blue",
    description: "Disability certificate for accessing government concessions.",
  },
  {
    name: "Character Certificate",
    icon: "UserCheck",
    category: "Government",
    color: "blue",
    description: "Police clearance and character certificate for jobs abroad.",
  },
  {
    name: "Pension Apply",
    icon: "Landmark",
    category: "Government",
    color: "blue",
    description: "Apply for old age, widow, or disability pension schemes.",
  },
  {
    name: "Ration Card",
    icon: "ShoppingBasket",
    category: "Government",
    color: "blue",
    description:
      "Apply for new ration card or make corrections to existing one.",
  },
  {
    name: "Birth & Death Certificate",
    icon: "Baby",
    category: "Government",
    color: "blue",
    description: "Register births and deaths and obtain official certificates.",
  },

  // Banking & Finance
  {
    name: "Account Opening",
    icon: "UserPlus",
    category: "Banking",
    color: "green",
    description:
      "Open savings or current accounts with leading banks hassle-free.",
  },
  {
    name: "Mobile & Net Banking",
    icon: "Smartphone",
    category: "Banking",
    color: "green",
    description:
      "Set up mobile banking and internet banking for your accounts.",
  },

  // Jobs & Education
  {
    name: "Job Apply",
    icon: "Search",
    category: "Jobs",
    color: "orange",
    description:
      "Search and apply for government and private sector jobs online.",
  },
  {
    name: "Resume & Bio Data",
    icon: "FileText",
    category: "Jobs",
    color: "orange",
    description:
      "Professional resume and bio-data creation for job applications.",
  },
  {
    name: "Forms Filling",
    icon: "Edit",
    category: "Jobs",
    color: "orange",
    description:
      "Accurate form filling for exams, jobs, and government applications.",
  },

  // Printing & Xerox
  {
    name: "Xerox & Print",
    icon: "Printer",
    category: "Printing",
    color: "slate",
    description:
      "Black and white or color printing and xerox at affordable rates.",
  },
  {
    name: "Pass Photo (Urgent)",
    icon: "Camera",
    category: "Printing",
    color: "slate",
    description:
      "Passport-size photos printed quickly for urgent applications.",
  },
  {
    name: "Scan Document",
    icon: "ScanLine",
    category: "Printing",
    color: "slate",
    description: "High-quality document scanning saved as PDF or image files.",
  },
  {
    name: "Lamination",
    icon: "Layers",
    category: "Printing",
    color: "slate",
    description:
      "Laminate your certificates and important documents for protection.",
  },
  {
    name: "Download Services",
    icon: "Download",
    category: "Printing",
    color: "slate",
    description:
      "Download and print official documents from government portals.",
  },

  // Design & Software
  {
    name: "Typing & Data Entry",
    icon: "Keyboard",
    category: "Design",
    color: "purple",
    description:
      "Accurate typing and data entry in English, Hindi, or regional languages.",
  },
  {
    name: "Photo Editing",
    icon: "Image",
    category: "Design",
    color: "purple",
    description:
      "Professional photo editing, background removal, and retouching.",
  },
  {
    name: "Logo Design",
    icon: "PenTool",
    category: "Design",
    color: "purple",
    description:
      "Creative logo design for businesses, shops, and organizations.",
  },
  {
    name: "Website Create",
    icon: "Globe",
    category: "Design",
    color: "purple",
    description:
      "Build modern websites for businesses and personal portfolios.",
  },
  {
    name: "Apps & Software",
    icon: "Box",
    category: "Design",
    color: "purple",
    description: "Mobile app development and custom software solutions.",
  },
  {
    name: "PSD Files",
    icon: "FileImage",
    category: "Design",
    color: "purple",
    description: "Custom PSD templates for banners, flyers, and certificates.",
  },
  {
    name: "Photoshop Install",
    icon: "Monitor",
    category: "Design",
    color: "purple",
    description:
      "Install Photoshop, Illustrator, and other Adobe creative tools.",
  },
  {
    name: "Microsoft Office Suite",
    icon: "Grid",
    category: "Design",
    color: "purple",
    description:
      "Install and set up Microsoft Office: Word, Excel, PowerPoint and more.",
  },
  {
    name: "Digital ID Card",
    icon: "IdCard",
    category: "Design",
    color: "purple",
    description:
      "Professional digital ID card design for staff and organizations.",
  },
];

export const categoryLabels: Record<string, string> = {
  Government: "Government Services",
  Banking: "Banking & Finance",
  Jobs: "Job Portal",
  Printing: "Printing Services",
  Design: "Design Services",
};
