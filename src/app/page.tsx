import { TodoInput } from "@/components/TodoInput";
import { getTodoList } from "./actions";
import { TodoEntry } from "@/components/TodoEntry";

export default async function Home() {
  const todos = await getTodoList();

  return (
    <main className="flex flex-col justify-start gap-4">
      <h1 className="text-2xl font-light">Todo List</h1>
      <ul>
        {todos.items.map((todo) => (
          <TodoEntry key={todo.id} item={todo} />
        ))}
      </ul>
      <TodoInput />
    </main>
  );
}
