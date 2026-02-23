import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToggleTask, useDeleteTask } from '../hooks/useQueries';
import type { Task } from '../backend';

interface TodoItemProps {
  task: Task;
}

export default function TodoItem({ task }: TodoItemProps) {
  const toggleTask = useToggleTask();
  const deleteTask = useDeleteTask();

  return (
    <Card
      className={`group transition-all duration-300 hover:shadow-lg border-2 ${
        task.completed
          ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20'
          : 'border-purple-200 dark:border-purple-800 bg-white/80 dark:bg-gray-800/80'
      } backdrop-blur-sm rounded-2xl overflow-hidden`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleTask.mutate(task.id)}
            className="flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center hover:scale-110"
            style={{
              borderColor: task.completed ? 'oklch(0.7 0.15 145)' : 'oklch(0.6 0.15 290)',
              backgroundColor: task.completed ? 'oklch(0.7 0.15 145)' : 'transparent',
            }}
          >
            {task.completed && (
              <img
                src="/assets/generated/check-icon.dim_64x64.png"
                alt="Completed"
                className="w-4 h-4"
              />
            )}
          </button>
          <p
            className={`flex-1 transition-all duration-300 ${
              task.completed
                ? 'line-through text-gray-500 dark:text-gray-500 opacity-60'
                : 'text-gray-800 dark:text-gray-100'
            }`}
          >
            {task.description}
          </p>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => deleteTask.mutate(task.id)}
            className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
