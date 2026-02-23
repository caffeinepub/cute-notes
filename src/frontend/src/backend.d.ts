import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Task {
    id: bigint;
    completed: boolean;
    description: string;
}
export interface Note {
    id: bigint;
    title: string;
    content: string;
}
export interface backendInterface {
    addTask(description: string): Promise<bigint>;
    createNote(title: string, content: string): Promise<bigint>;
    deleteNote(id: bigint): Promise<void>;
    deleteTask(id: bigint): Promise<void>;
    getAllNotes(): Promise<Array<Note>>;
    getAllTasks(): Promise<Array<Task>>;
    getNote(id: bigint): Promise<Note>;
    getNotesSortedByTitle(): Promise<Array<Note>>;
    toggleTaskCompletion(id: bigint): Promise<void>;
    updateNote(id: bigint, newTitle: string, newContent: string): Promise<void>;
}
