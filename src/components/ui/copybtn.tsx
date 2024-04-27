import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";

export function CopyButton({ text }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const successful = await navigator.clipboard.writeText(text);
      console.log("Copy success:", successful);
      setCopied(true);
      toast({
        description: "Copied Code from Editor to clipboard!",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        duration: 2000, // Adjust based on your component's implementation
      });
      setTimeout(() => setCopied(false), 2000); // Reset copied status
    } catch (err) {
      console.error("Failed to copy:", err);
      toast({
        description: "Failed to copy code to clipboard",
        action: <ToastAction altText="Close">Dismiss</ToastAction>,
      });
    }
  };

  return (
    <Button
      variant="outline"
      onClick={() => {
        handleCopy();
        console.log("Attempt to copy:", text); // Check what is being attempted to copy
      }}
    >
      <Copy className={copied ? "text-green-500" : "text-gray-500"} />
      {/* {copied ? "Copied" : "Copy"} */}
    </Button>
  );
}
