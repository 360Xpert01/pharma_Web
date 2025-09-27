"use client";
export default function ErrorPage() {
  return (
    <div className="min-h-dvh grid place-items-center">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    </div>
  );
}
