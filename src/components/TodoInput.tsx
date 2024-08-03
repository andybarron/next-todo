"use client";
import { addTodoItem } from "@/app/actions";
import { useActionState } from "react";

export function TodoInput() {
  const [formState, formAction, formPending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      if (formPending) return;
      await addTodoItem(formData);
    },
    undefined,
  );

  return (
    <form action={formAction}>
      <input
        readOnly={formPending}
        autoFocus
        placeholder="Enter new task..."
        className="appearance-none border bg-slate-800 p-1 placeholder:text-white/50 placeholder:italic"
        type="text"
        name="text"
      />
    </form>
  );
}
