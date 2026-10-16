"use client";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import { Button, Input, PasswordInput } from "@pycolors/ui";

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function AuthDemoForm({
  mode,
}: Readonly<{ mode: "login" | "register" | "reset" }>) {
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (mode === "register" && data.get("password") !== data.get("confirm")) {
      setError("Passwords do not match.");
      setStatus("");
      return;
    }
    setError("");
    setStatus(
      mode === "reset"
        ? "Demo complete. No reset email was sent."
        : mode === "register"
          ? "Demo complete. No account was created."
          : "Demo complete. No session was created. You can explore the workspace below.",
    );
    form.reset();
  }
  return (
    <form
      onSubmit={submit}
      onChange={() => {
        setStatus("");
        setError("");
      }}
    >
      <fieldset disabled={!ready} className="min-w-0 space-y-4">
        <legend className="sr-only">Local account preview</legend>
        <p className="rounded-md border border-border bg-muted/30 p-3 text-xs leading-6 text-muted-foreground">
          Use sample details. Nothing is sent or saved; no account, session or
          email service is connected.
        </p>
        {mode === "register" ? (
          <Input
            label="Full name"
            name="name"
            placeholder="Alex Morgan"
            autoComplete="off"
            required
            maxLength={80}
          />
        ) : null}
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="alex@example.com"
          autoComplete="off"
          required
          maxLength={254}
        />
        {mode !== "reset" ? (
          <PasswordInput
            label="Sample password"
            name="password"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={128}
            helperText="At least 8 characters. Use a made-up password."
          />
        ) : null}
        {mode === "register" ? (
          <PasswordInput
            label="Confirm sample password"
            name="confirm"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={128}
            error={error || undefined}
          />
        ) : null}
        {mode === "login" ? (
          <Link
            href="/forgot-password"
            className="inline-flex min-h-10 items-center text-xs underline underline-offset-4"
          >
            Forgot password?
          </Link>
        ) : null}
        <Button type="submit" className="w-full">
          {mode === "reset"
            ? "Try reset flow"
            : mode === "register"
              ? "Try account creation"
              : "Try sign-in flow"}
        </Button>
        <p
          role="status"
          className="min-h-10 text-xs leading-6 text-muted-foreground"
        >
          {status || "This is an interface preview."}
        </p>
        <noscript>
          Enable JavaScript to try this local form. You can still explore the
          workspace below.
        </noscript>
      </fieldset>
    </form>
  );
}
