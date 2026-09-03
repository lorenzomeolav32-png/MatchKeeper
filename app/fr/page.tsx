import type { Metadata } from "next";
import { Landing } from "@/components/landing";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: content.fr.meta.title,
  description: content.fr.meta.description,
  alternates: {
    canonical: "/fr",
    languages: { en: "/", nl: "/nl", fr: "/fr" },
  },
};

export default function FrenchHome() {
  return <Landing lang="fr" />;
}
