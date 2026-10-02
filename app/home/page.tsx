import type { Metadata } from "next";
import { ProductHome } from "@/components/platform/product-home";

// Landing REAL de producto (no la de validación en "/"). No enlazada desde
// "/" todavía, solo accesible por URL directa.
export const metadata: Metadata = {
  title: "Find a goalkeeper for your football match",
  description:
    "Post your match and nearby goalkeepers apply, or join as a goalkeeper and get paid to play. London pilot.",
  robots: { index: false, follow: false },
};

export default function HomePreview() {
  return <ProductHome />;
}
