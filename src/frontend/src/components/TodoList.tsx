import { useGetAllTasks } from '../hooks/useQueries';
import TodoItem from './TodoItem';
import { Loader2 } from 'lucide-react';

export default function TodoList() {
  const { data: tasks, isLoading } = useGetAllTasks();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border-2 border-dashed border-purple-300 dark:border-purple-700">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks yet! Add your first to-do above ✅</p>
      </div>
    );
  }

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="space-y-6">
      {incompleteTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide px-2">
            To Do ({incompleteTasks.length})
          </h3>
          {incompleteTasks.map((task) => (
            <TodoItem key={task.id.toString()} task={task} />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide px-2">
            Completed ({completedTasks.length})
          </h3>
          {completedTasks.map((task) => (
            <TodoItem key={task.id.toString()} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
