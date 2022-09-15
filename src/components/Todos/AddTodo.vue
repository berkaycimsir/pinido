<script setup lang="ts">
import { User } from '@firebase/auth';
import { addDoc } from '@firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { ref } from 'vue';
import { auth, todosRef } from '../../db';
import { Todo, useTodosStore } from '../../store/useTodosStore';
import { getTodos } from '../../utils/todo';

const store = useTodosStore();

const text = ref<string>('');

const addTodo = async () => {
  if (!text.value) return;

  const newTodo: Pick<Todo, 'text' | 'completed' | 'userId' | 'createdAt'> = {
    text: text.value,
    completed: false,
    userId: (auth.currentUser as User).uid,
    createdAt: new Date(),
  };

  text.value = '';

  const newTodos = [{ id: uuidv4(), ...newTodo }, ...store.todos];

  store.updateTodos(newTodos);

  await addDoc(todosRef, newTodo);
  await getTodos();
};
</script>

<template>
  <input
    id="todo-text"
    name="todo-text"
    @keyup.enter="addTodo"
    type="text"
    v-model="text"
    autocomplete="off"
    required
    class="relative block w-full appearance-none rounded-xl border-gray-200 font-medium text-md shadow-sm px-6 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-400 focus:border-2 focus:outline-none focus:ring-0"
    placeholder="Add todo"
  />
</template>
