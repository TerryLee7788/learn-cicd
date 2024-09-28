import Header from "@/components/Header";
import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreatTodo";
import { todoUrl } from "./lib/todoApi";

export default function Home() {
  return (
    <main className="max-w-7xl flex flex-col gap-10 mx-auto p-10">
      <nav>
        <Header />
        <h1>Welcome to my Next.js DevOps App!</h1>
        <p>This is a simple app for learning DevOps practices.</p>
      </nav>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Todos: {todoUrl}</h1>
        <CreateTodo />
      </div>
      <TodoList />
    </main>
  );
}
