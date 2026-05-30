export type ProjectStatus = "active" | "planning" | "completed";

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  description: string;
  tags: string[];
  teamSize: number;
  startDate: string;
  completion: number;
  budget: string;
  updatedAt: string;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Platform Redesign",
    status: "active",
    description:
      "Complete overhaul of the customer-facing platform with a focus on accessibility, performance, and modern design patterns.",
    tags: ["Design", "Frontend", "UX"],
    teamSize: 6,
    startDate: "Jan 2025",
    completion: 68,
    budget: "€120k",
    updatedAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Data Pipeline Migration",
    status: "active",
    description:
      "Migrating legacy ETL processes to a cloud-native pipeline architecture with real-time processing capabilities.",
    tags: ["Backend", "Infrastructure", "Data"],
    teamSize: 4,
    startDate: "Mar 2025",
    completion: 42,
    budget: "€85k",
    updatedAt: "1 day ago",
  },
  {
    id: "3",
    title: "Partner Portal",
    status: "planning",
    description:
      "Self-service portal allowing partner organisations to manage integrations, view analytics, and request support.",
    tags: ["Product", "API", "Partners"],
    teamSize: 5,
    startDate: "Jun 2025",
    completion: 12,
    budget: "€95k",
    updatedAt: "3 days ago",
  },
  {
    id: "4",
    title: "Mobile App v2",
    status: "planning",
    description:
      "Second generation of the mobile application with offline support, push notifications, and biometric authentication.",
    tags: ["Mobile", "iOS", "Android"],
    teamSize: 7,
    startDate: "Jul 2025",
    completion: 8,
    budget: "€200k",
    updatedAt: "5 days ago",
  },
  {
    id: "5",
    title: "Analytics Dashboard",
    status: "completed",
    description:
      "Internal analytics dashboard for tracking KPIs, user behaviour, and business metrics across all product lines.",
    tags: ["Analytics", "Internal", "React"],
    teamSize: 3,
    startDate: "Sep 2024",
    completion: 100,
    budget: "€45k",
    updatedAt: "2 months ago",
  },
  {
    id: "6",
    title: "Auth Service Upgrade",
    status: "completed",
    description:
      "Upgraded authentication service to support OAuth 2.0, SAML, and multi-factor authentication for enterprise clients.",
    tags: ["Security", "Backend", "Enterprise"],
    teamSize: 3,
    startDate: "Nov 2024",
    completion: 100,
    budget: "€60k",
    updatedAt: "3 months ago",
  },
];

export interface Partner {
  id: string;
  name: string;
  role: string;
  category: "Technology" | "Consulting" | "Finance" | "Research";
  email: string;
  since: number;
}

export const PARTNERS: Partner[] = [
  {
    id: "1",
    name: "Nexora Systems",
    role: "Cloud Infrastructure",
    category: "Technology",
    email: "partnerships@nexora.io",
    since: 2021,
  },
  {
    id: "2",
    name: "Berger & Partner",
    role: "Strategic Consulting",
    category: "Consulting",
    email: "hello@berger-partner.de",
    since: 2022,
  },
  {
    id: "3",
    name: "Alpine Ventures",
    role: "Series B Lead",
    category: "Finance",
    email: "invest@alpine-vc.ch",
    since: 2023,
  },
  {
    id: "4",
    name: "ETH Zürich Lab",
    role: "AI Research Partner",
    category: "Research",
    email: "collab@ethz.ch",
    since: 2024,
  },
  {
    id: "5",
    name: "Luminary Digital",
    role: "UX & Design",
    category: "Consulting",
    email: "studio@luminary.design",
    since: 2023,
  },
  {
    id: "6",
    name: "DataBridge AG",
    role: "Data Integration",
    category: "Technology",
    email: "info@databridge.ag",
    since: 2022,
  },
];
