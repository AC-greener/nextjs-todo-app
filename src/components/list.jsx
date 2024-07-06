/**
 * v0 by Vercel.
 * @see https://v0.dev/t/vWBNsLi64i9
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { nanoid } from 'nanoid' // Import nanoid

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import clsx from 'clsx' // Import clsx

export default function Component() {
  const [tasks, setTasks] = useState(
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("tasks") || "[]") : [],
  )
  const [newTask, setNewTask] = useState("")
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: nanoid(),
          title: newTask,
          completed: false,
        },
      ])
      setNewTask("")
    }
  }
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <main className="w-full max-w-md rounded-lg bg-card p-6 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">Todo List</h1>
        <div className="mb-6 flex items-center gap-2">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1"
          />
          <Button onClick={addTask}>Add</Button>
        </div>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between rounded-md bg-muted p-2">
              <div className="flex items-center gap-2">
                <Checkbox checked={task.completed} onCheckedChange={() => toggleTaskCompletion(task.id)} />
                <span
                  className={clsx("text-sm", {
                    "line-through text-muted-foreground": task.completed,
                  })}
                >
                  {task.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => toggleTaskCompletion(task.id)}>
                  <FileCheckIcon className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => deleteTask(task.id)}>
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

function FileCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  )
}


function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}