import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import LoadingDots from "./loading-dots";

import { cn } from "@/lib/utils";

export  const DeleteButton = ({ id }: { id: string }) => {
    let [isPending, startTransition] = useTransition();
    const router = useRouter();

    async function deleteTodo(id: string): Promise<void> {
        // Simulate an API call to delete the todo
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return (
      <button
        onClick={() =>
          startTransition(() =>
            deleteTodo(id).then(() => {
            //   toast.success("Post deleted!");
              router.refresh();
            })
          )
        }
        disabled={isPending}
        className={cn(
          "bg-red-500 transition-all border border-transparent text-white rounded-md w-20 py-2",
          isPending
            ? "border-gray-300 bg-gray-200 cursor-not-allowed"
            : "hover:bg-red-600 active:bg-red-700"
        )}
      >
        {isPending ? <LoadingDots /> : <p>Delete</p>}
      </button>
    );
  };
