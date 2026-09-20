"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const CONSENT_KEY = "mygrafix-cookie-consent";

type Consent = "accepted" | "declined";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem(CONSENT_KEY) as Consent | null;
    if (!consent) window.setTimeout(() => setVisible(true), 0);
  }, []);

  function saveConsent(value: Consent) {
    window.localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-label="Cookie and privacy notice"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-[8px] card-elevated bg-background/95 p-5 backdrop-blur-xl md:inset-x-auto md:bottom-6 md:right-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
        <div>
          <p className="kicker mb-2 text-subtle">Privacy Note</p>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            We use essential local storage to remember preferences such as dark
            mode and this consent choice. We do not use advertising cookies or
            sell personal information.
          </p>
          <Link
            href="/privacy"
            className="mono-label mt-3 inline-block text-accent-brand underline-offset-4 hover:underline"
          >
            Read our Privacy Policy
          </Link>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button type="button" variant="secondary" onClick={() => saveConsent("declined")}>
            Decline
          </Button>
          <Button type="button" variant="primary" onClick={() => saveConsent("accepted")}>
            Accept
          </Button>
        </div>
      </div>
    </aside>
  );
}
