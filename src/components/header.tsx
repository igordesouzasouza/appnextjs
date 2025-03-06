import { Gift, UsersRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function header() {
  return (
    <header className="border-b">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <Gift className="h-6 w-6 text-blue-800" />
            <span>
              Amigo
              <span className="font-thin">Secreto</span>
            </span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/aplicacao/grupos" className="text-foreground text-sm flex gap-2 items-center">
            <UsersRound className="w-4 h-4" />
            Meus Grupos 
            </Link>
            <Button asChild variant='ghost' >
                <Link href="/aplicacao/grupos/novo">
                Novo Grupo 
                </Link>
            </Button>

          </nav>
        </div>
      </div>
    </header>
  );
}
