"use client";

import { useEffect } from "react";

const TRONLINK_ERROR_SNIPPET = "tronlinkParams";

export default function ErrorSuppressor() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      const message = event?.message || "";
      const filename = event?.filename || "";

      if (
        message.includes(TRONLINK_ERROR_SNIPPET) ||
        filename.startsWith("chrome-extension://")
      ) {
        event.preventDefault();
        return true;
      }

      return false;
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = (event?.reason && String(event.reason)) || "";
      if (reason.includes(TRONLINK_ERROR_SNIPPET)) {
        event.preventDefault();
      }
    };

    window.addEventListener("error", onError, true);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onError, true);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}
