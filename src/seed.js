// scripts/seed.js
"use server"
const { sql } = require('@vercel/postgres');
const { tasks } = require('./lib/placeholder-data');

async function createTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE
    );
  `;
}

async function initializeData() {
  for (const task of tasks) {
    await sql`
      INSERT INTO tasks (title, completed)
      VALUES (${task.title}, ${task.completed})
      ON CONFLICT DO NOTHING;
    `;
  }
  const insertedTasks = await sql`SELECT * FROM tasks`;
  return insertedTasks;
}

export {
  createTable,
  initializeData
}