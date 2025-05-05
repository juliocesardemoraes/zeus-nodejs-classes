import QuoteCard from "@/components/quote-card";
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold tracking-tight">
          Frases Famosas
        </h1>
        <QuoteCard />
      </div>
    </main>
  );
}
