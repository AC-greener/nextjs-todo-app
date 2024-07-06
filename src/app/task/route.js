import prisma from '../../../lib/prisma';

export async function GET(req, res) {
  try {
    const tasks = await prisma.task.findMany();
    return new Response(JSON.stringify(tasks), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(error.message, {
      status: 500,
    });
  }
}

export async function POST(req, res) {
  try {
    const { title } = await req.json();
    const newTask = await prisma.task.create({
      data: {
        title,
      },
    });
    return new Response(JSON.stringify(newTask), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(error.message, {
      status: 500,
    });
  }
}

export async function PATCH(req, res) {
  try {
    const { id, completed } = await req.json();
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { completed },
    });
    return new Response(JSON.stringify(updatedTask), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(error.message, {
      status: 500,
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

    const deletedTask = await prisma.task.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deletedTask), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (error.code === 'P2025') { // Prisma error code for record not found
      return new Response('Task not found', {
        status: 404,
      });
    }
    return new Response(error.message, {
      status: 500,
    });
  }
}
