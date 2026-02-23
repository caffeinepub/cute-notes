import { useState } from 'react';
import NotesList from '../components/NotesList';
import NoteEditor from '../components/NoteEditor';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { Note } from '../backend';

export default function NotesPage() {
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingNote(null);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setEditingNote(null);
    setIsCreating(false);
  };

  const handleSave = () => {
    setEditingNote(null);
    setIsCreating(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img
            src="/assets/generated/cloud-icon.dim_128x128.png"
            alt="Cloud"
            className="w-16 h-16 drop-shadow-lg animate-bounce"
            style={{ animationDuration: '3s' }}
          />
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              My Notes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Write down your thoughts and ideas ✨</p>
          </div>
        </div>
        {!isCreating && !editingNote && (
          <Button
            onClick={handleCreate}
            className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-pink-300/50 dark:shadow-pink-900/50 transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="order-2 lg:order-1">
          <NotesList onEdit={handleEdit} currentEditingId={editingNote?.id} />
        </div>
        <div className="order-1 lg:order-2">
          {(isCreating || editingNote) && (
            <div className="sticky top-24">
              <NoteEditor note={editingNote} onCancel={handleCancel} onSave={handleSave} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
