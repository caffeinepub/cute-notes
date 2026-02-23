import { useGetAllNotes, useDeleteNote } from '../hooks/useQueries';
import NoteCard from './NoteCard';
import { Loader2 } from 'lucide-react';
import type { Note } from '../backend';

interface NotesListProps {
  onEdit: (note: Note) => void;
  currentEditingId?: bigint;
}

export default function NotesList({ onEdit, currentEditingId }: NotesListProps) {
  const { data: notes, isLoading } = useGetAllNotes();
  const deleteNote = useDeleteNote();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-pink-400" />
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border-2 border-dashed border-pink-300 dark:border-pink-700">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No notes yet! Create your first note to get started 📝</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id.toString()}
          note={note}
          onEdit={onEdit}
          onDelete={() => deleteNote.mutate(note.id)}
          isEditing={currentEditingId === note.id}
        />
      ))}
    </div>
  );
}
