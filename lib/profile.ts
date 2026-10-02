export type Role = "player" | "goalkeeper";

export const LEVELS = ["Casual", "Intermediate", "Competitive", "Semi-pro"] as const;

export const AVATAR_MAX_BYTES = 5 * 1024 * 1024;
export const AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const BIO_MAX = 500;
export const KEEPER_BIO_MIN = 40;

export type ProfileValues = {
  displayName: string;
  city: string;
  bio: string;
  level: string;
  experienceYears: string;
  avatarUrl: string;
  teamName: string;
};

export type ChecklistItem = {
  key: string;
  label: string;
  done: boolean;
  /** Obligatorio para que el admin pueda aprobar al portero. */
  required: boolean;
};

/**
 * Qué cuenta como perfil completo, por rol. Se usa igual en el formulario
 * (en vivo) y en el dashboard (servidor), así el porcentaje nunca se desdobla.
 * Criterio de MASTER.md: foto, ciudad y bio son obligatorias para el portero;
 * experiencia y nivel suman pero no bloquean.
 */
export function profileChecklist(role: Role, v: ProfileValues): ChecklistItem[] {
  if (role === "goalkeeper") {
    return [
      { key: "avatar", label: "Profile photo", done: !!v.avatarUrl, required: true },
      { key: "city", label: "City", done: !!v.city.trim(), required: true },
      {
        key: "bio",
        label: `Bio (${KEEPER_BIO_MIN}+ characters)`,
        done: v.bio.trim().length >= KEEPER_BIO_MIN,
        required: true,
      },
      { key: "experience", label: "Years of experience", done: v.experienceYears.trim() !== "", required: false },
      { key: "level", label: "Level you play at", done: !!v.level, required: false },
    ];
  }
  return [
    { key: "team", label: "Team name", done: !!v.teamName.trim(), required: true },
    { key: "city", label: "City", done: !!v.city.trim(), required: true },
    { key: "level", label: "Usual level", done: !!v.level, required: false },
    { key: "avatar", label: "Team photo or crest", done: !!v.avatarUrl, required: false },
    { key: "bio", label: "About your team", done: !!v.bio.trim(), required: false },
  ];
}

export function completeness(items: ChecklistItem[]) {
  const done = items.filter((i) => i.done).length;
  return {
    percent: Math.round((done / items.length) * 100),
    requiredMissing: items.filter((i) => i.required && !i.done),
  };
}

type ProfileRow = {
  display_name?: string | null;
  city?: string | null;
  bio?: string | null;
  level?: string | null;
  experience_years?: number | null;
  avatar_url?: string | null;
};

export function valuesFromRow(row: ProfileRow | null, teamName = ""): ProfileValues {
  return {
    displayName: row?.display_name ?? "",
    city: row?.city ?? "",
    bio: row?.bio ?? "",
    level: row?.level ?? "",
    experienceYears: row?.experience_years == null ? "" : String(row.experience_years),
    avatarUrl: row?.avatar_url ?? "",
    teamName,
  };
}
