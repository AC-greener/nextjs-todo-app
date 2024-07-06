// /api/route.js

import { getTasks, addTask, updateTask, deleteTask } from "../../lib/db";

export async function GET(req, res) {
  try {
    const tasks = await getTasks();
    return Response.json(tasks);
  } catch (error) {
    return new Response(error.message, {
      status: 200,
    });
  }
}

export async function POST(req, res) {
  try {
    const { title } = await req.json();
    const newTask = await addTask(title);
    return Response.json(newTask);
  } catch (error) {
    return new Response(error.message, {
      status: 200,
    });
  }
}

export async function PATCH(req, res) {
  try {
    const { id, completed } = await req.json();
    const updatedTask = await updateTask(id, completed);
    return Response.json(updatedTask);
  } catch (error) {
    return new Response(error.message, {
      status: 200,
    });
  }
}

export async function DELETE(req, res) {
  try {
    
    const { id } = await req.json();
    
    if (!id) {
      return new Response('No id provided', {
        status: 400,
      });
    }


    const deletedTask = await deleteTask(id);

    if (!deletedTask) {
      return new Response('Task not found', {
        status: 404,
      });
    }

    return new Response(JSON.stringify(deletedTask), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(error.message, {
      status: 200,
    });
  }
}
