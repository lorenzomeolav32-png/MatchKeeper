import type { Metadata } from "next";
import { Landing } from "@/components/landing";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: content.nl.meta.title,
  description: content.nl.meta.description,
  alternates: {
    canonical: "/nl",
    languages: { en: "/", nl: "/nl" },
  },
};

export default function DutchHome() {
  return <Landing lang="nl" />;
}
