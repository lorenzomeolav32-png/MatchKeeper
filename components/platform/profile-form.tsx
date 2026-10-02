"use client";

import { useActionState, useId, useState } from "react";
import Link from "next/link";
import { saveProfileAction, type ProfileActionState } from "@/lib/actions/profile";
import {
  BIO_MAX,
  KEEPER_BIO_MIN,
  LEVELS,
  completeness,
  profileChecklist,
  type ProfileValues,
  type Role,
} from "@/lib/profile";
import { AvatarUpload } from "@/components/platform/avatar-upload";
import { Field, FormError, SubmitButton, TextField } from "@/components/platform/form-fields";
import { CheckIcon } from "@/components/platform/icons";

const initialState: ProfileActionState = { error: null };

export function ProfileForm({
  role,
  userId,
  initial,
}: {
  role: Role;
  userId: string;
  initial: ProfileValues;
}) {
  const isKeeper = role === "goalkeeper";
  const [state, formAction, pending] = useActionState(saveProfileAction, initialState);
  const [v, setV] = useState<ProfileValues>(initial);
  const set = <K extends keyof ProfileValues>(key: K, value: ProfileValues[K]) =>
    setV((prev) => ({ ...prev, [key]: value }));

  const items = profileChecklist(role, v);
  const { percent } = completeness(items);
  const fe = state.fieldErrors ?? {};

  const bioId = useId();
  const initials =
    v.displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "MK";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
      {/* Móvil: el resumen completo queda al final, así que el avance se ve siempre arriba. */}
      <div
        aria-hidden
        className="sticky top-0 z-20 -mx-5 -mb-4 flex items-center gap-4 border-b border-line bg-[color-mix(in_oklab,var(--bg)_88%,transparent)] px-5 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:hidden"
      >
        <p className="pl-tnum w-10 text-sm font-semibold text-fg">{percent}%</p>
        <div className="pl-meter flex-1">
          <div className="pl-meter__fill" style={{ "--pct": percent / 100 } as React.CSSProperties} />
        </div>
      </div>

      <form action={formAction} className="grid gap-8" noValidate>
        {state.error && <FormError>{state.error}</FormError>}

        <input type="hidden" name="avatarUrl" value={v.avatarUrl} />

        <AvatarUpload
          userId={userId}
          value={v.avatarUrl}
          initials={initials}
          label={isKeeper ? "Profile photo" : "Team photo or crest"}
          hint={
            isKeeper
              ? "A clear photo of you. Teams see it before they pick. JPEG, PNG or WebP, up to 5 MB."
              : "Optional. JPEG, PNG or WebP, up to 5 MB."
          }
          error={fe.avatarUrl}
          onChange={(url) => set("avatarUrl", url)}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Your name"
            name="displayName"
            required
            autoComplete="name"
            value={v.displayName}
            onChange={(e) => set("displayName", e.target.value)}
            error={fe.displayName}
          />
          <TextField
            label="City"
            name="city"
            required
            autoComplete="address-level2"
            placeholder="London"
            value={v.city}
            onChange={(e) => set("city", e.target.value)}
            error={fe.city}
          />
        </div>

        {!isKeeper && (
          <TextField
            label="Team name"
            name="teamName"
            required
            placeholder="Hackney Marshes FC"
            value={v.teamName}
            onChange={(e) => set("teamName", e.target.value)}
            error={fe.teamName}
            hint="Keepers see this when you post a match."
          />
        )}

        <fieldset className="grid gap-2.5">
          <legend className="mb-1 flex w-full items-baseline justify-between text-sm font-medium text-fg-2">
            {isKeeper ? "Level you play at" : "Usual level of your matches"}
            <span className="text-xs font-normal text-muted">Optional</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((l) => (
              <span key={l}>
                <input
                  type="radio"
                  name="level"
                  value={l}
                  id={`level-${l}`}
                  className="sr-only"
                  checked={v.level === l}
                  onChange={() => set("level", l)}
                />
                <label htmlFor={`level-${l}`} className="pl-chip">
                  {l}
                </label>
              </span>
            ))}
          </div>
        </fieldset>

        {isKeeper && (
          <TextField
            label="Years as a goalkeeper"
            name="experienceYears"
            type="number"
            inputMode="numeric"
            min={0}
            max={60}
            step={1}
            placeholder="6"
            value={v.experienceYears}
            onChange={(e) => set("experienceYears", e.target.value)}
            error={fe.experienceYears}
            optional
          />
        )}

        <Field
          label={isKeeper ? "Bio" : "About your team"}
          htmlFor={bioId}
          optional={!isKeeper}
          error={fe.bio}
          hint={
            isKeeper
              ? `Where you have played, your strengths, how you like to work. At least ${KEEPER_BIO_MIN} characters.`
              : "Pitch details, kit colour, how the group likes to play."
          }
        >
          <textarea
            id={bioId}
            name="bio"
            className="pl-input"
            maxLength={BIO_MAX}
            value={v.bio}
            onChange={(e) => set("bio", e.target.value)}
            aria-invalid={fe.bio ? true : undefined}
            aria-describedby={fe.bio ? `${bioId}-error` : `${bioId}-hint`}
          />
          <span className="pl-tnum text-right text-xs text-muted">
            {v.bio.length}/{BIO_MAX}
          </span>
        </Field>

        <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/dashboard" className="pl-focus inline-flex min-h-11 items-center justify-center text-sm font-medium text-muted underline underline-offset-4 hover:text-fg">
            Skip for now
          </Link>
          <div className="sm:w-60">
            <SubmitButton pending={pending} pendingLabel="Saving…">
              Save profile
            </SubmitButton>
          </div>
        </div>
      </form>

      <aside className="lg:sticky lg:top-8 lg:self-start" aria-label="Profile completeness">
        <div className="pl-surface p-6">
          <div className="flex items-baseline justify-between">
            <p className="pl-eyebrow">Profile</p>
            <p className="pl-display pl-tnum text-fg [font-size:var(--t-3xl)]">{percent}%</p>
          </div>
          <div
            className="pl-meter mt-4"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Profile completeness"
          >
            <div className="pl-meter__fill" style={{ "--pct": percent / 100 } as React.CSSProperties} />
          </div>

          <ul className="mt-5 grid gap-3">
            {items.map((i) => (
              <li key={i.key} className="flex items-center gap-3 text-sm">
                <span
                  aria-hidden
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors duration-200 ${
                    i.done ? "border-transparent bg-accent text-accent-ink" : "border-line-strong text-transparent"
                  }`}
                >
                  <CheckIcon className="h-3 w-3" />
                </span>
                <span className={i.done ? "text-fg-2" : "text-fg"}>
                  {i.label}
                  <span className="sr-only">{i.done ? ", done" : ", missing"}</span>
                </span>
                {i.required && !i.done && (
                  <span className="ml-auto text-[11px] font-semibold uppercase tracking-wider text-warning">Required</span>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-5 border-t border-line pt-4 text-[13px] leading-relaxed text-muted">
            {isKeeper
              ? "A person reviews your profile before you can apply to matches. A fuller profile gets checked faster."
              : "You can post a match without finishing this. A named team with a city is what keepers look for."}
          </p>
        </div>
      </aside>
    </div>
  );
}
