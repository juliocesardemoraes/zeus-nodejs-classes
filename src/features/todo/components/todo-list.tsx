"use client";

import type React from "react";
import TodoItem from "./todo-item";

export default function TodoList() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <TodoItem></TodoItem>
      </div>
    </div>
  );
}
