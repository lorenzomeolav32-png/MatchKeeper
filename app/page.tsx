import type { Metadata } from "next";
import { Landing } from "@/components/landing";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <Landing />;
}
