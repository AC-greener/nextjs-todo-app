"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../lib/prisma";
import { auth } from "/auth";
import { redirect } from "next/navigation";

async function checkSession() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/api/auth/signin"); // Navigate to the signin page
  }
  return session;
}

export async function serverAddTask({ title }) {
  const session = await checkSession();
  console.log("session", session);
  const newTask = await prisma.task.create({
    data: {
      title,
      authorId: session?.user?.id, // 使用 authorId 字段
    },
  });
  revalidatePath("/"); // This ensures the server-side cache is invalidated
  return newTask; // Return the newly created task
}

export async function serverDeleteTask(id) {
  const session = await checkSession();
  console.log("session", session);
  
  const deletedTask = await prisma.task.delete({
    where: { id },
  });
  revalidatePath("/"); // This ensures the server-side cache is invalidated
  return deletedTask; // Return the newly created task
}

export async function serverUpdateTask(id, completed) {
  const session = await checkSession();
  console.log("session", session);
  const updatedTask = await prisma.task.update({
    where: { id },
    data: {
      completed,
    },
  });
  revalidatePath("/"); // This ensures the server-side cache is invalidated
  return updatedTask; // Return the newly created task
}
