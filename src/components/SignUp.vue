<script lang="ts" setup>
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import {
  getDownloadURL,
  uploadBytes,
  ref as storageRef,
} from '@firebase/storage';
import { uuidv4 } from '@firebase/util';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, storage } from '../db';
import { handleSignUpError } from '../utils/auth';
import LoadingSpinner from './LoadingSpinner.vue';

const router = useRouter();

const pictureUploadLoading = ref<boolean>(false);
const loading = ref<boolean>(false);
const error = ref<string | undefined>(undefined);

const profilePictureUrl = ref<string | undefined>(undefined);
const fullName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');

const buttonDisabled = computed<boolean>(
  () =>
    !email.value ||
    !password.value ||
    !fullName.value ||
    !profilePictureUrl.value
);

const clear = () => {
  fullName.value = '';
  email.value = '';
  password.value = '';
};

const onFileSelected = async (e: Event) => {
  pictureUploadLoading.value = true;
  const selectedFile = (e.target as HTMLInputElement)?.files?.[0];

  if (selectedFile) {
    try {
      const res = await uploadBytes(
        storageRef(storage, `profile-picture-${uuidv4()}`),
        selectedFile
      );
      profilePictureUrl.value = await getDownloadURL(res.ref);
    } catch (e) {
      console.log(e);
    }
  }

  pictureUploadLoading.value = false;
};

const onSubmit = async () => {
  loading.value = true;

  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    if (res.user && auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: fullName.value,
        photoURL: profilePictureUrl.value,
      });

      router.push('/todos');
    }
  } catch (e) {
    error.value = handleSignUpError(e);
    setTimeout(() => (error.value = undefined), 2000);
  }

  clear();
  loading.value = false;
};
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="mt-8 space-y-6 px-4"
    action="#"
    method="POST"
  >
    <input type="hidden" name="remember" value="true" />

    <div class="flex items-center gap-4">
      <div class="flex items-center justify-center shrink-0 w-16 h-16">
        <LoadingSpinner v-if="pictureUploadLoading" />
        <img
          v-else
          class="h-16 w-16 object-cover rounded-full"
          :src="
            profilePictureUrl ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmLbR6OHvoXjzY5UWbguFvw4HQcKZkfbKP7w&usqp=CAU'
          "
          alt="Current profile photo"
        />
      </div>
      <label class="block">
        <input
          @change="onFileSelected($event)"
          type="file"
          class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
      </label>
    </div>

    <div class="-space-y-px rounded-md shadow-sm">
      <div>
        <label for="fullname" class="sr-only">Full Name</label>
        <input
          id="fullname"
          name="fullname"
          type="text"
          autocomplete="off"
          required
          v-model="fullName"
          class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Full Name"
        />
      </div>

      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input
          id="email-address"
          name="email"
          type="email"
          autocomplete="off"
          required
          v-model="email"
          class="mt-5 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Email address"
        />
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          v-model="password"
          autocomplete="off"
          required
          class="relative mt-5 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Password"
        />
      </div>
    </div>

    <div
      v-if="error"
      class="w-full text-sm bg-red-200 text-red-800 rounded-md px-4 py-2"
    >
      {{ error }}
    </div>

    <button
      type="submit"
      :disabled="buttonDisabled || loading"
      class="group disabled:bg-gray-400 relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <span
        v-if="buttonDisabled"
        class="absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <svg
          class="h-5 w-5 text-gray-500 group-hover:text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      {{ loading ? 'Loading...' : 'Sign Up' }}
    </button>
  </form>
</template>
