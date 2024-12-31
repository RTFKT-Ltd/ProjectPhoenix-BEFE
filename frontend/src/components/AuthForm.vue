<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../utils/auth'
import { useForm } from '../composables/useForm'
import FormInput from './ui/FormInput.vue'
import FormButton from './ui/FormButton.vue'

const router = useRouter()
const isLogin = ref(true)

const { email, password, confirmPassword, errors, handleSubmit, loading } = useForm(isLogin)

async function onSubmitSuccess(response: { token: string, email: string }) {
  auth.login(response.email, response.token)
  await router.push('/dashboard')
}
</script>

<template>
  <div class="w-full max-w-md p-8 bg-rtfkt-dark rounded-lg shadow-xl border border-gray-800">
    <h2 class="text-2xl font-bold mb-6 text-white">
      {{ isLogin ? 'Login' : 'Register' }}
    </h2>
    <form @submit.prevent="() => handleSubmit(onSubmitSuccess)" class="space-y-4">
      <FormInput
        v-model="email"
        type="email"
        label="Email"
        :error="errors.email"
        placeholder="Enter your email"
      />
      <FormInput
        v-model="password"
        type="password"
        label="Password"
        :error="errors.password"
        placeholder="Enter your password"
      />
      <FormInput
        v-if="!isLogin"
        v-model="confirmPassword"
        type="password"
        label="Confirm Password"
        :error="errors.confirmPassword"
        placeholder="Confirm your password"
      />
      <p v-if="errors.submit" class="text-red-500 text-sm text-center">
        {{ errors.submit }}
      </p>
      <FormButton type="submit" :disabled="loading">
        {{ isLogin ? 'Sign In' : 'Create Account' }}
        <span v-if="loading" class="ml-2">...</span>
      </FormButton>
      <p class="text-center text-gray-400 text-sm">
        {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
        <button
          type="button"
          @click="isLogin = !isLogin"
          class="text-rtfkt-purple hover:underline ml-1"
        >
          {{ isLogin ? 'Register' : 'Login' }}
        </button>
      </p>
    </form>
  </div>
</template>