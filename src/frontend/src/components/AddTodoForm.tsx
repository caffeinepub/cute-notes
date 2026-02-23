import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAddTask } from '../hooks/useQueries';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AddTodoForm() {
  const [description, setDescription] = useState('');
  const addTask = useAddTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error('Please enter a task description');
      return;
    }

    try {
      await addTask.mutateAsync(description.trim());
      setDescription('');
      toast.success('Task added! 🎉');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  return (
    <Card className="border-2 border-purple-300 dark:border-purple-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 backdrop-blur-sm rounded-2xl shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-shrink-0">
            <img
              src="/assets/generated/star-icon.dim_96x96.png"
              alt="Star"
              className="w-10 h-10 drop-shadow-md"
            />
          </div>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 rounded-xl border-purple-200 dark:border-purple-800 focus:border-purple-400 dark:focus:border-purple-600 focus:ring-purple-400 dark:focus:ring-purple-600 bg-white/80 dark:bg-gray-800/80"
            disabled={addTask.isPending}
          />
          <Button
            type="submit"
            disabled={addTask.isPending}
            className="rounded-full bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-300/50 dark:shadow-purple-900/50 transition-all duration-300 hover:scale-105"
          >
            {addTask.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
