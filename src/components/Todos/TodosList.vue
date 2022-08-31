<script setup lang="ts">
import { updateDoc, doc, deleteDoc } from '@firebase/firestore';
import { firestore } from '../../db';
import { useTodosStore } from '../../store/useTodosStore';
import CheckIcon from '../CheckIcon.vue';
import DeleteIcon from '../DeleteIcon.vue';

const store = useTodosStore();

const completeTodo = async (id: string, newValue: boolean) => {
  const todoRef = doc(firestore, 'todos', id);
  updateDoc(todoRef, { completed: newValue });

  const newTodos = store.todos.map((todo) =>
    todo.id === id ? { ...todo, completed: newValue } : todo
  );
  store.updateTodos(newTodos);
};

const removeTodo = (id: string) => {
  const todoRef = doc(firestore, 'todos', id);
  deleteDoc(todoRef);

  const newTodos = store.todos.filter((todo) => todo.id !== id);
  store.updateTodos(newTodos);
};
</script>

<template>
  <ul class="mt-12" v-auto-animate>
    <li
      @click="completeTodo(todo.id, !todo.completed)"
      :class="{
        'bg-green-100 border-green-100 text-green-700 hover:bg-green-50':
          todo.completed,
        'border-gray-50 hover:bg-gray-50': !todo.completed,
      }"
      class="w-full flex items-center mb-6 justify-between border cursor-pointer shadow-sm rounded-lg py-3 px-4"
      v-for="todo in store.todos"
      :key="todo.id"
    >
      <div class="flex items-center gap-x-2">
        <div @click="removeTodo(todo.id)"><DeleteIcon /></div>
        <div class="font-medium">{{ todo.text }}</div>
      </div>
      <div
        :class="{
          'bg-gray-50': !todo.completed,
          'bg-green-500 border-0': todo.completed,
        }"
        class="flex items-center justify-center border w-6 h-6 rounded-full"
      >
        <CheckIcon v-if="todo.completed" />
      </div>
    </li>
  </ul>
</template>
