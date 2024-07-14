import { auth } from "/auth";
import prisma from '../../lib/prisma';
import TaskList from "./TaskList";
export default async function Home() {
  const session = await auth();
  let tasks = [];
  if (session?.user?.id) {
    tasks = await prisma.task.findMany({
      where: { authorId: session.user.id },
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <main className="w-full max-w-md rounded-lg bg-card p-6 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">Todo List1</h1>
        <TaskList initialTasks={tasks} />
      </main>
    </div>
  );
}
