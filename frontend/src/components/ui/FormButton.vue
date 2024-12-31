<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset'
}>()
</script>

<template>
  <button
    :type="type || 'button'"
    class="w-full py-2 px-4 bg-rtfkt-purple text-white rounded-md hover:bg-opacity-90 transition-all transform hover:scale-[1.02] focus:ring-2 focus:ring-offset-2 focus:ring-rtfkt-purple focus:outline-none"
  >
    <slot></slot>
  </button>
</template>