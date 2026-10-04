"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="wrap page">
      <h1>This page did not load</h1>
      <p>Try again in a moment.</p>
      <button className="button" type="button" onClick={reset}>Try again</button>
    </div>
  );
}
