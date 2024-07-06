
import App from '../components/Task'
import {createTable, initializeData} from '../seed'
(async () => {
  try {
    // await createTable();
    // const insertedTasks = await initializeData();
    // console.log('initialized successfully');
    // console.log('Inserted tasks:', insertedTasks.rows);
  } catch (error) {
    console.error('Database initialization failed', error);
  }
})();

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <App/>
    </main>
  );
}
