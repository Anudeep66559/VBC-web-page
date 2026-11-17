import type { LucideIcon } from "lucide-react";
import {
  Home,
  Building2,
  PaintRoller,
  Sofa,
  ClipboardCheck,
  HardHat,
  Compass,
  Boxes,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

/* ----------------------------- Types ----------------------------- */

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

export interface ProjectItem {
  title: string;
  category: string;
  location: string;
  year?: string;
  description: string;
  image: string;
}

export interface ContactItem {
  label: string;
  value: string;
  icon: LucideIcon;
  href?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

/* ----------------------------- Data ----------------------------- */

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const heroCards: HeroCard[] = [
  {
    title: "Modern Design",
    description:
      "Contemporary architecture tailored to your vision and lifestyle.",
    icon: Compass,
  },
  {
    title: "Quality Craftsmanship",
    description:
      "Fine materials and the latest construction practices, every project.",
    icon: Boxes,
  },
  {
    title: "Lasting Value",
    description:
      "Structures built to endure — a promise of trust in every brick.",
    icon: ShieldCheck,
  },
];

export const stats: StatItem[] = [
  { value: 16, label: "Years Experience" },
  { value: 50, label: "Projects Delivered" },
  { value: 100, suffix: "%", label: "Commitment" },
  { value: 2011, label: "Established" },
];

export const aboutParagraphs: string[] = [
  "With an unwavering passion for building spaces that inspire, our journey in the construction industry began in 2011 as a partner in Sree Constructions. Over the next sixteen years, we played a pivotal role in planning, executing, and delivering a wide range of residential, commercial, and infrastructure projects — earning the trust of countless clients who valued our dedication to quality and timely delivery.",
  "In 2023, with a vision to bring our own ideas, innovation, and customer-focused approach to life, Veerabhadra Constructions was established. Every project we undertake is executed with precision, using the finest materials and the latest construction practices, while keeping our client's vision at the core.",
  "We don't just build structures — we create enduring landmarks that reflect elegance, strength, and functionality. Every brick we lay is a promise of trust.",
];

export const services: ServiceItem[] = [
  {
    number: "01",
    title: "Residential Construction",
    description:
      "From custom homes to apartment complexes, we build living spaces that combine beauty, functionality, and durability.",
    icon: Home,
    image: "/images/service-1.jpg",
  },
  {
    number: "02",
    title: "Commercial Construction",
    description:
      "We specialize in constructing office buildings, retail spaces, and other commercial properties that meet business needs.",
    icon: Building2,
    image: "/images/service-2.jpg",
  },
  {
    number: "03",
    title: "Renovation & Remodeling",
    description:
      "Transform your existing space with our expert renovation services that breathe new life into any property.",
    icon: PaintRoller,
    image: "/images/service-3.jpg",
  },
  {
    number: "04",
    title: "Interior Design",
    description:
      "Our design team creates beautiful, functional interiors that reflect your style and meet your practical needs.",
    icon: Sofa,
    image: "/images/service-4.jpg",
  },
  {
    number: "05",
    title: "Project Management",
    description:
      "We oversee every aspect of your construction project to ensure it's completed on time and within budget.",
    icon: ClipboardCheck,
    image: "/images/service-5.jpg",
  },
  {
    number: "06",
    title: "Construction Consulting",
    description:
      "Expert advice on all aspects of construction, from planning and design to materials and regulations.",
    icon: HardHat,
    image: "/images/service-6.jpg",
  },
];

export const projects: ProjectItem[] = [
  {
    title: "Mythri Convention",
    category: "Commercial",
    location: "Karimnagar",
    year: "Completed 2014",
    description:
      "Twin 20,000 sq ft halls built as a connected multi-storey complex complete with unobstructed interiors, air-conditioned guest suites, and robust utility infrastructure.",
    image: "/images/project-1.jpg",
  },
  {
    title: "Sree Villas",
    category: "Residential",
    location: "Karimnagar",
    year: "Completed 2016",
    description:
      "A gated community with underground electricity, well-planned roads, entrance arch, parks & plantations — ensuring a secure, harmonious living environment.",
    image: "/images/project-2.jpg",
  },
  {
    title: "Mithaiwala",
    category: "Commercial",
    location: "Karimnagar",
    year: "Completed 2022",
    description:
      "A well-planned construction with a glass-front display and hygienic, temperature-controlled interiors that ensure freshness and attract customers.",
    image: "/images/project-3.jpg",
  },
  {
    title: "Independent Houses",
    category: "Residential",
    location: "Karimnagar",
    description:
      "Bespoke independent residences crafted to reflect each client's vision — blending modern design with enduring structural quality.",
    image: "/images/project-4.jpg",
  },
];

export const contactItems: ContactItem[] = [
  {
    label: "Office Location",
    value: "1st floor, Mythri Convention building, Kisan Nagar, Karimnagar, Telangana 505001",
    icon: MapPin,
  },
  {
    label: "Phone",
    value: "+91 98496 53030",
    icon: Phone,
    href: "tel:+919849653030",
  },
  {
    label: "Email",
    value: "pradeept3030@gmail.com",
    icon: Mail,
    href: "mailto:pradeept3030@gmail.com",
  },
  {
    label: "Working Hours",
    value: "Monday – Saturday: 9:00 AM – 6:00 PM",
    icon: Clock,
  },
];

export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Instagram", href: "#", icon: Instagram },
];

export const footerServices: string[] = [
  "Residential Construction",
  "Commercial Construction",
  "Renovation",
  "Interior Design",
  "Project Management",
];

export const siteConfig = {
  name: "Veerabhadra Constructions",
  shortName: "Veerabhadra",
  tagline: "Building Your Vision With Excellence",
  founded: "2011",
  description:
    "Building excellence since 2011. We are committed to delivering quality construction services with integrity and professionalism.",
  phone: "+91 98496 53030",
  phoneHref: "tel:+919849653030",
  email: "pradeept3030@gmail.com",
  emailHref: "mailto:pradeept3030@gmail.com",
  address:
    "1st floor, Mythri Convention building, Kisan Nagar, Karimnagar, Telangana 505001",
  copyright: "© 2025 Veerabhadra Constructions. All Rights Reserved.",
};
