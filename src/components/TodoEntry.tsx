"use client";
import { removeTodoItem, updateTodoItem } from "@/app/actions";
import { TodoItem } from "@/types";
import { useActionState, useId, useOptimistic } from "react";

type Props = {
  item: TodoItem;
};

export function TodoEntry({ item: { completed, id, text } }: Props) {
  const checkboxId = useId();
  const [optimisticCompleted, setOptimisticCompleted] =
    useOptimistic(completed);
  const [, toggle, togglePending] = useActionState(async () => {
    setOptimisticCompleted((value) => !value);
    await updateTodoItem(id, { completed: !completed });
  }, undefined);

  const [, remove, removePending] = useActionState(async () => {
    await removeTodoItem(id);
  }, undefined);

  const pending = togglePending || removePending;

  return (
    <li className="flex flex-row gap-2 items-center">
      <button
        disabled={pending}
        onClick={remove}
        aria-label="Remove"
        className="disabled:opacity-50"
      >
        x
      </button>
      <input
        className="cursor-pointer"
        id={checkboxId}
        type="checkbox"
        checked={optimisticCompleted}
        onChange={toggle}
        disabled={pending}
      />
      <label htmlFor={checkboxId} className="cursor-pointer">
        {text}
      </label>
    </li>
  );
}
