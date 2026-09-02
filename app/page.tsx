import type { Metadata } from "next";
import { Landing } from "@/components/landing";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: content.en.meta.title,
  description: content.en.meta.description,
  alternates: {
    canonical: "/",
    languages: { en: "/", nl: "/nl" },
  },
};

export default function Home() {
  return <Landing lang="en" />;
}
