"use server";
import assert from "node:assert";
import fs from "node:fs/promises";
import type { TodoItem, TodoList } from "@/types";
import { delay } from "@/debug";
import { revalidatePath } from "next/cache";

const DEBUG_DELAY = 0;
const TODOS_FILE = "data/todos.json";

const todos = await loadTodoList();
await saveTodoList();

async function saveTodoList(): Promise<void> {
  await fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2));
}

async function loadTodoList(): Promise<TodoList> {
  try {
    const data = await fs.readFile(TODOS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {
      items: [
        { id: "1", text: "Learn React", completed: true },
        { id: "2", text: "Learn Next.js", completed: false },
      ],
    };
  }
}

export async function getTodoList(): Promise<TodoList> {
  await delay();
  return todos;
}

export async function addTodoItem(formData: FormData) {
  await delay();
  const text = formData.get("text");
  assert(typeof text === "string");
  const id = Math.random().toString(36).slice(2);
  todos.items.push({ id, text, completed: false });
  await saveTodoList();
  revalidatePath("/");
  return { errorMessage: undefined };
}

export async function updateTodoItem(
  id: string,
  update: Partial<Omit<TodoItem, "id">>,
) {
  await delay();
  const todo = todos.items.find((todo) => todo.id === id);
  if (!todo) {
    return;
  }
  Object.assign(todo, update);
  await saveTodoList();
  revalidatePath("/");
  return {};
}

export async function removeTodoItem(id: string) {
  await delay();
  const index = todos.items.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return;
  }
  todos.items.splice(index, 1);
  await saveTodoList();
  revalidatePath("/");
}
