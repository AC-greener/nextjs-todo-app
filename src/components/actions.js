"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../lib/prisma";

export async function serverAddTask({ title }) {
  const newTask = await prisma.task.create({
    data: {
      title,
    },
  });
  revalidatePath("/"); // This ensures the server-side cache is invalidated
  return newTask; // Return the newly created task
}
export async function serverDeleteTask(id) {
  const deletedTask = await prisma.task.delete({
    where: { id },
  });
  revalidatePath("/"); // This ensures the server-side cache is invalidated
  return deletedTask; // Return the newly created task
}
export async function serverUpdateTask(id, completed) {
  const updatedTask = await prisma.task.update({
    where: { id },
    data: {
      completed,
    },
  });
  revalidatePath("/"); // This ensures the server-side cache is invalidated
  return updatedTask; // Return the newly created task
}
