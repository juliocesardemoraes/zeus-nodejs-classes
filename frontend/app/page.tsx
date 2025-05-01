"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [studentName, setStudentName] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudentName = async () => {
      try {
        // Fetch from our API route (which simulates localhost:3000/user)
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Falha ao buscar dados do estudante");
        }
        const data = await response.json();
        setStudentName(data.name);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados do estudante:", error);
        setIsLoading(false);
      }
    };

    fetchStudentName();
  }, []);

  useEffect(() => {
    if (!studentName || displayedText.length >= studentName.length) return;

    // Create typing effect by adding one character at a time
    const typingTimer = setTimeout(() => {
      setDisplayedText(studentName.substring(0, displayedText.length + 1));
    }, 100); // Adjust speed of typing here

    return () => clearTimeout(typingTimer);
  }, [displayedText, studentName]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Quem sou eu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            {isLoading ? (
              <p className="text-muted-foreground">Carregando dados...</p>
            ) : (
              <div className="text-xl font-medium min-h-8">
                {displayedText}
                <span className="animate-pulse">|</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
