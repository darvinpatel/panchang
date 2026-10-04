"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="wrap page">
      <h1>The patro could not open this page</h1>
      <p>{error.message}</p>
      <button className="button" type="button" onClick={reset}>Try again</button>
    </div>
  );
}
