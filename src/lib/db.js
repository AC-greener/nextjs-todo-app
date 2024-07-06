// lib/db.js

const { sql } = require("@vercel/postgres");

async function getTasks() {
  const { rows } = await sql`SELECT * FROM tasks ORDER BY id ASC`;
  return rows || [];
}

async function addTask(title) {
  const { rows } = await sql`
    INSERT INTO tasks (title, completed)
    VALUES (${title}, false)
    RETURNING *
  `;
  return rows[0];
}

async function updateTask(id, completed) {
  const { rows } = await sql`
    UPDATE tasks
    SET completed = ${completed}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

async function deleteTask(id) {
  try {
    // Log the id being deleted
    console.log(`Deleting task with id: ${id}`);

    const { rows } = await sql`
      DELETE FROM tasks
      WHERE id = ${id}
      RETURNING *
    `;

    // Log the raw query result
    console.log("Query result:", rows);

    // Check if any rows were deleted
    if (rows.length === 0) {
      console.log("No task found with the specified id.");
      return null;
    }

    return rows[0];
  } catch (error) {
    // Log any errors that occur during query execution
    console.error("Error executing query:", error);
    throw error;
  }
}

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};
