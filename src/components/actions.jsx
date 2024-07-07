"use server"
import { revalidatePath } from 'next/cache';
import prisma from '../../lib/prisma';

export async function serverAddTask(title) {
  const newTask = await prisma.task.create({
    data: {
      title,
    },
  });
  console.log('newTask 11');
  revalidatePath('/'); // This ensures the server-side cache is invalidated
  return newTask; // Return the newly created task
}