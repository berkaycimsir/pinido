<script setup lang="ts">
const fakeArray = Array.from({ length: 6 }, (_, i) => i + 1);
</script>

<template>
  <div class="animate-pulse mt-12">
    <div
      v-for="item in fakeArray"
      :key="item"
      class="h-11 mb-6 shadow-sm w-full bg-stone-100 rounded-lg"
    />
  </div>
</template>
