import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

actor {
  type Note = {
    id : Nat;
    title : Text;
    content : Text;
  };

  type Task = {
    id : Nat;
    description : Text;
    completed : Bool;
  };

  var nextNoteId = 0;
  var nextTaskId = 0;

  let notes = Map.empty<Nat, Note>();
  let tasks = Map.empty<Nat, Task>();

  module Note {
    public func compareByTitle(note1 : Note, note2 : Note) : Order.Order {
      switch (Text.compare(note1.title, note2.title)) {
        case (#equal) { Nat.compare(note1.id, note2.id) };
        case (order) { order };
      };
    };
  };

  public shared ({ caller }) func createNote(title : Text, content : Text) : async Nat {
    let note : Note = {
      id = nextNoteId;
      title;
      content;
    };
    notes.add(nextNoteId, note);
    nextNoteId += 1;
    note.id;
  };

  public query ({ caller }) func getNote(id : Nat) : async Note {
    switch (notes.get(id)) {
      case (null) { Runtime.trap("Note not found") };
      case (?note) { note };
    };
  };

  public shared ({ caller }) func updateNote(id : Nat, newTitle : Text, newContent : Text) : async () {
    switch (notes.get(id)) {
      case (null) { Runtime.trap("Note not found") };
      case (?_) {
        let updatedNote : Note = {
          id;
          title = newTitle;
          content = newContent;
        };
        notes.add(id, updatedNote);
      };
    };
  };

  public shared ({ caller }) func deleteNote(id : Nat) : async () {
    if (not notes.containsKey(id)) {
      Runtime.trap("Note not found");
    };
    notes.remove(id);
  };

  public query ({ caller }) func getAllNotes() : async [Note] {
    notes.values().toArray();
  };

  public query ({ caller }) func getNotesSortedByTitle() : async [Note] {
    notes.values().toArray().sort(Note.compareByTitle);
  };

  public shared ({ caller }) func addTask(description : Text) : async Nat {
    let task : Task = {
      id = nextTaskId;
      description;
      completed = false;
    };
    tasks.add(nextTaskId, task);
    nextTaskId += 1;
    task.id;
  };

  public shared ({ caller }) func toggleTaskCompletion(id : Nat) : async () {
    switch (tasks.get(id)) {
      case (null) { Runtime.trap("Task not found") };
      case (?task) {
        let updatedTask : Task = {
          id = task.id;
          description = task.description;
          completed = not task.completed;
        };
        tasks.add(id, updatedTask);
      };
    };
  };

  public shared ({ caller }) func deleteTask(id : Nat) : async () {
    if (not tasks.containsKey(id)) {
      Runtime.trap("Task not found");
    };
    tasks.remove(id);
  };

  public query ({ caller }) func getAllTasks() : async [Task] {
    tasks.values().toArray();
  };
};
