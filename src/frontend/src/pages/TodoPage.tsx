import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';

export default function TodoPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <img
          src="/assets/generated/star-icon.dim_96x96.png"
          alt="Star"
          className="w-16 h-16 drop-shadow-lg animate-pulse"
        />
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            My To-Dos
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Keep track of your tasks and goals 🎯</p>
        </div>
      </div>

      <div className="space-y-6">
        <AddTodoForm />
        <TodoList />
      </div>
    </div>
  );
}
