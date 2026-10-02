"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { CtaAction } from "@/components/platform/cta-button";

export function FormError({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      className="rounded-[var(--r-md)] border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-fg"
    >
      {children}
    </p>
  );
}

export function SubmitButton({
  pending,
  pendingLabel,
  children,
}: {
  pending: boolean;
  pendingLabel: string;
  children: ReactNode;
}) {
  return (
    <CtaAction type="submit" disabled={pending} className="-mx-[7px] w-[calc(100%+14px)]">
      {pending ? pendingLabel : children}
    </CtaAction>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  optional,
  aside,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  /** Elemento a la derecha de la etiqueta (p. ej. un enlace). Fuera del <label>. */
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-sm font-medium text-fg-2">
          {label}
        </label>
        {aside ?? (optional && <span className="text-xs font-normal text-muted">Optional</span>)}
      </div>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-[13px] text-danger">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${htmlFor}-hint`} className="text-[13px] text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
};

export function TextField({ label, hint, error, optional, name, ...props }: TextFieldProps) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} hint={hint} error={error} optional={optional}>
      <input
        id={id}
        name={name}
        className="pl-input"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...props}
      />
    </Field>
  );
}

export function PasswordField({
  label = "Password",
  hint,
  aside,
  autoComplete,
  minLength,
}: {
  label?: string;
  hint?: string;
  aside?: ReactNode;
  autoComplete: "current-password" | "new-password";
  minLength?: number;
}) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  return (
    <Field label={label} htmlFor={id} hint={hint} aside={aside}>
      <div className="relative">
        <input
          id={id}
          name="password"
          type={visible ? "text" : "password"}
          required
          minLength={minLength}
          autoComplete={autoComplete}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="pl-input pr-20"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          className="pl-focus absolute inset-y-1 right-1 rounded-[var(--r-sm)] px-3 text-[13px] font-semibold text-fg-2 transition-colors duration-200 hover:text-fg"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </Field>
  );
}
