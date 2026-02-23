import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import type { Note } from '../backend';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: () => void;
  isEditing?: boolean;
}

export default function NoteCard({ note, onEdit, onDelete, isEditing }: NoteCardProps) {
  return (
    <Card
      className={`group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ${
        isEditing
          ? 'border-pink-400 shadow-lg shadow-pink-200/50 dark:shadow-pink-900/50 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/50 dark:to-purple-950/50'
          : 'border-pink-200 dark:border-pink-800 bg-white/80 dark:bg-gray-800/80 hover:border-pink-300 dark:hover:border-pink-700'
      } backdrop-blur-sm rounded-2xl overflow-hidden`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100 line-clamp-2">
            {note.title || 'Untitled Note'}
          </CardTitle>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(note)}
              className="h-8 w-8 rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/30 text-pink-600 dark:text-pink-400"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={onDelete}
              className="h-8 w-8 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 whitespace-pre-wrap">{note.content}</p>
      </CardContent>
    </Card>
  );
}
