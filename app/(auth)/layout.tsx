import { ThemeScope } from "@/components/platform/theme";
import { themeInitScript } from "@/components/platform/theme-config";

/** Login, registro y onboarding comparten el tema de plataforma, igual que /home. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      <ThemeScope>{children}</ThemeScope>
    </>
  );
}
