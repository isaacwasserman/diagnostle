export function Header() {
  return (
    <header className="flex items-center justify-between py-3 px-4 border-b">
      <h1 className="text-xl font-bold text-teal-600 tracking-tight">
        Diagnostle
      </h1>
      <p className="text-xs text-muted-foreground hidden sm:block">
        {new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
    </header>
  );
}
