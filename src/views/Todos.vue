<script setup lang="ts">
import TodosHeader from '../components/Todos/Header.vue';
import TodosList from '../components/Todos/TodosList.vue';
import AddTodo from '../components/Todos/AddTodo.vue';
import { onMounted, ref } from 'vue';
import { getTodos } from '../utils/todo';
import TodoSkeletons from '../components/Todos/TodoSkeletons.vue';

const loading = ref<boolean>(false);

onMounted(async () => {
  loading.value = true;
  await getTodos();
  loading.value = false;
});
</script>

<template>
  <div class="h-full max-w-[1000px] container mx-auto mt-32 px-4">
    <TodosHeader />

    <div class="flex items-center mt-12">
      <AddTodo />
    </div>

    <TodoSkeletons v-if="loading" />
    <TodosList v-else />
  </div>
</template>
