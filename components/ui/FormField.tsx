import type { InputHTMLAttributes, ReactNode, Ref, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  id: string;
  label: string;
  optional?: boolean;
  optionalLabel?: string;
  error?: string;
  children?: ReactNode;
};

export function FieldShell({ id, label, optional, optionalLabel = "opcional", error, children }: BaseProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-bold text-text-primary">
        {label} {optional ? <span className="font-normal text-text-secondary">({optionalLabel})</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-error-text" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const fieldClass = "min-h-12 w-full border border-border bg-surface px-4 py-3 text-base text-text-primary outline-none transition-colors placeholder:text-field-placeholder hover:border-border-strong focus:border-accent focus:ring-1 focus:ring-accent";

export function TextInput({ id, label, optional, optionalLabel, error, inputRef, ...props }: BaseProps & InputHTMLAttributes<HTMLInputElement> & { inputRef?: Ref<HTMLInputElement> }) {
  return (
    <FieldShell id={id} label={label} optional={optional} optionalLabel={optionalLabel} error={error}>
      <input ref={inputRef} id={id} className={fieldClass} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />
    </FieldShell>
  );
}

export function SelectInput({ id, label, error, children, ...props }: BaseProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <select id={id} className={fieldClass} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props}>
        {children}
      </select>
    </FieldShell>
  );
}

export function TextArea({ id, label, error, ...props }: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea id={id} className={`${fieldClass} min-h-36 resize-y`} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />
    </FieldShell>
  );
}
