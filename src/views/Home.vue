<script setup lang="ts">
import { ref } from 'vue';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';

const mode = ref<'sign-in' | 'sign-up'>('sign-up');

const toggleMode = () => {
  if (mode.value === 'sign-in') mode.value = 'sign-up';
  else mode.value = 'sign-in';
};
</script>

<template>
  <div class="flex h-full items-center justify-center">
    <div class="w-full max-w-md">
      <div class="flex items-center justify-center mb-12">
        <img src="https://pinia.vuejs.org/logo.svg" width="32" height="32" />
        <h2
          class="ml-4 text-center text-3xl font-bold tracking-tight text-gray-900"
        >
          {{ mode === 'sign-in' ? 'Sign in' : 'Sign up' }} to Pinido
        </h2>
      </div>

      <SignIn v-if="mode === 'sign-in'" />
      <SignUp v-else />

      <div class="mt-8 text-center">
        <span>
          {{
            mode === 'sign-in'
              ? "Don't have an account? "
              : 'Already have an account? '
          }}
        </span>
        <span
          @click="toggleMode"
          class="select-none underline font-medium text-indigo-600 cursor-pointer"
        >
          {{ mode === 'sign-in' ? 'Sign Up' : 'Sign In' }}
        </span>
      </div>
    </div>
  </div>
</template>
