// pages/index.js

import { getTasks } from "../lib/db";
import TaskList from "./TaskList";
export default async function Home() {
  const tasks = await getTasks();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <main className="w-full max-w-md rounded-lg bg-card p-6 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">Todo List</h1>
        <TaskList initialTasks={tasks} />
      </main>
    </div>
  );
}
