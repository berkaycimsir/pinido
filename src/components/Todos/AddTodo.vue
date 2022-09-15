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
  <div class="flex flex-col w-full">
    <input
      id="todo-text"
      name="todo-text"
      @keyup.enter="addTodo"
      type="text"
      v-model="text"
      autocomplete="off"
      required
      class="relative block w-full appearance-none rounded-xl border-gray-200 font-medium text-md shadow-sm px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-400 focus:border-1 focus:outline-none focus:ring-0"
      placeholder="What are you planning to do"
    />
    <div class="text-sm ml-1 mt-2 text-stone-500">
      Press enter to add your todo after typing it
    </div>
  </div>
</template>
