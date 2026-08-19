"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

type Fields = {
  name: string;
  email: string;
  handle: string;
  posts: string;
  bottleneck: string;
};

const EMPTY: Fields = { name: "", email: "", handle: "", posts: "", bottleneck: "" };

export function LeadFormSection() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [done, setDone] = useState(false);

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!fields.name.trim()) next.name = "Enter your name.";
    if (!fields.email.trim()) next.email = "Enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      next.email = "That email does not look right. Check the format.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    console.log("[miicxel-lead]", fields);
    setDone(true);
  };

  return (
    <section id="start" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionHeader
          tc="01:41"
          name="Start"
          heading="Tell me what you post and where it stalls."
          sub="Share what you post now. We'll map the first batch before you book."
        />
      </Reveal>

      <Reveal>
        {done ? (
          <div className="panel rounded-lg p-10 text-center">
            <p className="timecode mb-3 text-[10px] text-[#9061f9]">REEL RECEIVED · TC 01:41</p>
            <p className="text-xl font-medium tracking-[-0.01em] text-[#f2f1f5]">
              Received, {fields.name.split(" ")[0] || "there"}.
            </p>
            <p className="mx-auto mt-3 max-w-[46ch] text-[14px] leading-relaxed text-[#8e8c99]">
              Next up: a conversation about your first batch of clips.
            </p>
            <p className="timecode mt-8 text-[9px] text-[#817f95]">
              FORM IS LOCAL ONLY · THIS BUILD LOGS TO CONSOLE
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="panel rounded-lg p-6 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Name"
                hint="YOUR NAME"
                error={errors.name}
                value={fields.name}
                onChange={set("name")}
                autoComplete="name"
                required
              />
              <Field
                label="Email"
                hint="REPLY EMAIL"
                error={errors.email}
                value={fields.email}
                onChange={set("email")}
                autoComplete="email"
                inputMode="email"
                required
              />
            </div>

            <div className="mt-6">
              <Field
                label="Instagram or YouTube handle"
                hint="YOUR CHANNEL"
                error={errors.handle}
                value={fields.handle}
                onChange={set("handle")}
                autoComplete="off"
              />
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field
                label="What do you currently post?"
                hint="WHAT YOU POST NOW"
                error={errors.posts}
                value={fields.posts}
                onChange={set("posts")}
                textarea
                placeholder="e.g. podcast episodes, live streams"
              />
              <Field
                label="Biggest content bottleneck"
                hint="WHAT SLOWS YOU DOWN"
                error={errors.bottleneck}
                value={fields.bottleneck}
                onChange={set("bottleneck")}
                textarea
                placeholder="e.g. no time to edit, uneven posting"
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="timecode text-[9px] leading-relaxed text-[#817f95]">
                SUBMISSION CAPTURED LOCALLY · READY TO CONNECT
              </p>
              <button
                type="submit"
                className="rounded-md bg-[#7c3aed] px-6 py-2.5 text-[14px] font-semibold text-[#f2f1f5] transition-colors duration-200 ease-out hover:bg-[#9061f9] focus-visible:ring-2 focus-visible:ring-[#9061f9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16161b]"
              >
                Send the reel
              </button>
            </div>
          </form>
        )}
      </Reveal>
    </section>
  );
}

function Field({
  label,
  hint,
  error,
  value,
  onChange,
  textarea = false,
  ...rest
}: {
  label: string;
  hint: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "email" | "text" | "url";
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  const shared = `w-full rounded-md border bg-[#0b0b0e] px-3.5 text-[14px] text-[#f2f1f5] placeholder:text-[#817f95] transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9061f9] ${
    error ? "border-[#e5484d] focus-visible:ring-[#e5484d]" : "border-[#232228]"
  }`;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="text-[13px] font-medium text-[#f2f1f5]">
          {label}
          {rest.required && <span className="ml-1 text-[#9061f9]">*</span>}
        </label>
        <span className="timecode text-[9px] text-[#817f95]">{hint}</span>
      </div>
      {textarea ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${shared} py-2.5`}
          {...rest}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${shared} h-11`}
          {...rest}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="measure mt-1.5 text-[11px] text-[#e5484d]">
          {error}
        </p>
      )}
    </div>
  );
}
