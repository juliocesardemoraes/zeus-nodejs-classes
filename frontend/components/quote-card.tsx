"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getQuoteById, getQuotes } from "../api/quotes";

export default function QuoteCard({ id = null }: { id?: string | null }) {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [loading, setLoading] = useState(false);

  const getRandomQuote = () => {
    setLoading(true);
    setTimeout(async () => {
      if (id) {
        const newQuote = await getQuoteById(Number(id));
        setQuote(newQuote);
        setLoading(false);
      } else {
        const quotes = await getQuotes();
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
        setLoading(false);
      }
    }, 150);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        {quote.text ? (
          <div className="space-y-4">
            <blockquote className="border-l-4 border-primary pl-4 italic">
              <p className="text-lg">{quote.text}</p>
            </blockquote>
            <p className="text-right font-medium">— {quote.author}</p>
          </div>
        ) : (
          <div className="flex h-24 items-center justify-center">
            <p>Carregando frase...</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={getRandomQuote} className="w-full" disabled={loading}>
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Carregando...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Nova Frase
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
