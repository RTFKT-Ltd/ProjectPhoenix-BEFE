<script setup lang="ts">
defineProps<{
  modelValue: string
  label: string
  type?: string
  error?: string
  placeholder?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-gray-300">{{ label }}</label>
    <input
      :type="type || 'text'"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      class="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-rtfkt-purple transition-colors"
      :class="{ 'border-red-500': error }"
    />
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>