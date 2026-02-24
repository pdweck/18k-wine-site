"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const COOKIE_NAME = "18k_age_verified";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

function setVerifiedCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function getVerifiedCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith(`${COOKIE_NAME}=`));
}

const copyPt = {
  title: "Verificação de idade",
  question: "Você tem 18 anos ou mais?",
  yes: "Sim, tenho 18 anos ou mais",
  no: "Não",
  underage: "Para acessar este site você precisa ter 18 anos ou mais. O consumo de bebidas alcoólicas é proibido para menores de idade.",
};

const copyEn = {
  title: "Age verification",
  question: "Are you 18 years of age or older?",
  yes: "Yes, I am 18 or older",
  no: "No",
  underage: "You must be 18 or older to access this site. Alcohol consumption is prohibited for minors.",
};

export default function AgeGate() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [verified, setVerified] = useState(true); // assume verified until we check cookie
  const [declined, setDeclined] = useState(false);

  const isEn = pathname?.startsWith("/en") ?? false;
  const t = isEn ? copyEn : copyPt;

  useEffect(() => {
    setMounted(true);
    setVerified(getVerifiedCookie());
  }, []);

  const handleYes = () => {
    setVerifiedCookie();
    setVerified(true);
    setDeclined(false);
  };

  const handleNo = () => {
    setDeclined(true);
  };

  if (!mounted || verified) return null;

  return (
    <div
      className="age-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-question"
    >
      <div className="age-gate-backdrop" aria-hidden />
      <div className="age-gate-card">
        <h1 id="age-gate-title" className="age-gate-title">
          {t.title}
        </h1>
        {!declined ? (
          <>
            <p id="age-gate-question" className="age-gate-question">
              {t.question}
            </p>
            <div className="age-gate-buttons">
              <button
                type="button"
                className="age-gate-btn age-gate-btn--yes"
                onClick={handleYes}
              >
                {t.yes}
              </button>
              <button
                type="button"
                className="age-gate-btn age-gate-btn--no"
                onClick={handleNo}
              >
                {t.no}
              </button>
            </div>
          </>
        ) : (
          <p className="age-gate-underage">{t.underage}</p>
        )}
      </div>
    </div>
  );
}
