"use client";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import { FileCheckIcon, TrashIcon } from "./icon";
import { serverAddTask, serverDeleteTask, serverUpdateTask } from "./actions";
export default function TaskList({ initialTasks = [] }) {
  const [newTask, setNewTask] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isPending2, startTransition2] = useTransition();

  const handleAddTask = async () => {
    if (newTask.trim() !== "") {
      try {
        await serverAddTask({ title: newTask });
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    }
  };
  const toggleTaskCompletion = async (id, completed) => {
    if (!id) {
      console.error("No id provided for completion toggle");
      return;
    }
    console.log(`Toggling completion for task with id: ${id}`);
    await serverUpdateTask(id, completed);
  };

  const deleteTask = async (id) => {
    if (!id) {
      console.error("No id provided for deletion");
      return;
    }
    console.log(`Deleting task with id: ${id}`);
    await serverDeleteTask(id);
  };
  return (
    <>
      <div className="mb-6 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1"
        />
        <Button
          disabled={isPending2}
          onClick={() => startTransition2(() => handleAddTask(newTask))}
        >
          Add
        </Button>
      </div>
      <div className="space-y-2">
        {initialTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-md bg-muted p-2"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() =>
                  toggleTaskCompletion(task.id, !task.completed)
                }
                disabled={isPending}
              />
              <span
                className={clsx("text-sm", {
                  "line-through text-muted-foreground": task.completed,
                })}
              >
                {task.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                disabled={isPending}
                onClick={() =>
                  startTransition(() =>
                    toggleTaskCompletion(task.id, !task.completed)
                  )
                }
              >
                <FileCheckIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                disabled={isPending}
                onClick={() => startTransition(() => deleteTask(task.id))}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
