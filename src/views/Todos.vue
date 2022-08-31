<script setup lang="ts">
import TodosHeader from '../components/Todos/Header.vue';
import TodosList from '../components/Todos/TodosList.vue';
import AddTodo from '../components/Todos/AddTodo.vue';
import { onMounted } from 'vue';
import { getTodos } from '../utils/todo';

onMounted(async () => {
  await getTodos();
});
</script>

<template>
  <div class="h-full max-w-[1000px] container mx-auto mt-32 px-4">
    <TodosHeader />

    <div class="flex items-center mt-12">
      <AddTodo />
    </div>

    <TodosList />
  </div>
</template>
