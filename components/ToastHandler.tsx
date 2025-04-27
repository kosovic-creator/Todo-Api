"use client";

import { toast } from "@/components/hooks/use-toast";

export default function ToastHandler({ message }: { message: string }) {
  if (message) {
    toast({
      title: "Uspješno obrisan artikal",
      description: message,
      variant: "default",
    });
  }

  return null;
}