"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function InnerErrorAlert() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (!error) return null;

  let message = "";
  if (error === "unauthorized") message = "You must be signed in to access this page.";
  else if (error === "forbidden") message = "You do not have permission to access admin pages.";

  return (
    <div style={{ background: "pink", padding: "1rem", marginBottom: "1rem", borderRadius: "4px" }}>
      {message}
    </div>
  );
}

export default function ErrorAlert() {
  return (
    <Suspense fallback={null}>
      <InnerErrorAlert />
    </Suspense>
  );
}
