import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCreateNote, useUpdateNote } from '../hooks/useQueries';
import { Save, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Note } from '../backend';

interface NoteEditorProps {
  note: Note | null;
  onCancel: () => void;
  onSave: () => void;
}

export default function NoteEditor({ note, onCancel, onSave }: NoteEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createNote = useCreateNote();
  const updateNote = useUpdateNote();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    try {
      if (note) {
        await updateNote.mutateAsync({ id: note.id, title: title.trim(), content: content.trim() });
        toast.success('Note updated! ✨');
      } else {
        await createNote.mutateAsync({ title: title.trim(), content: content.trim() });
        toast.success('Note created! 🎉');
      }
      onSave();
    } catch (error) {
      toast.error('Failed to save note');
    }
  };

  const isLoading = createNote.isPending || updateNote.isPending;

  return (
    <Card className="border-2 border-pink-300 dark:border-pink-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl">
      <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 border-b border-pink-200 dark:border-pink-800">
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
          {note ? 'Edit Note' : 'Create New Note'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-700 dark:text-gray-300 font-medium">
            Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            className="rounded-xl border-pink-200 dark:border-pink-800 focus:border-pink-400 dark:focus:border-pink-600 focus:ring-pink-400 dark:focus:ring-pink-600"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content" className="text-gray-700 dark:text-gray-300 font-medium">
            Content
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts here..."
            rows={8}
            className="rounded-xl border-pink-200 dark:border-pink-800 focus:border-pink-400 dark:focus:border-pink-600 focus:ring-pink-400 dark:focus:ring-pink-600 resize-none"
            disabled={isLoading}
          />
        </div>
        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-pink-300/50 dark:shadow-pink-900/50 transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Note
              </>
            )}
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            disabled={isLoading}
            className="rounded-full border-pink-300 dark:border-pink-700 hover:bg-pink-100 dark:hover:bg-pink-900/30 text-gray-700 dark:text-gray-300"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
