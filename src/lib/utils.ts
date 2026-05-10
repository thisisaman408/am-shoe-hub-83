import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Shoe Hub 83",
  tagline: "Authentic sneakers · daily drops · worldwide shipping",
  founder: "Himanshu",
  ig: "https://www.instagram.com/shoe_hub83/",
  igHandle: "@shoe_hub83",
  whatsappChannel: "https://whatsapp.com/channel/0029Vab9kGI9RZAaycsJws1M",
  whatsapp: "https://wa.me/918375808771",
  phone: "+91 83758 08771",
  phoneRaw: "8375808771",
  city: "Delhi · Sagar Pur",
  followers: 38500,
  posts: 313,
} as const;
