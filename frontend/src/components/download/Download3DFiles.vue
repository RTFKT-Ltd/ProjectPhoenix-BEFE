<script setup lang="ts">
const openRTFKTAssets = () => {
  window.open('https://clonex-assets.rtfkt.com/', '_blank')
}
</script>

<template>
  <div>
    <button
      @click="openRTFKTAssets"
      class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-4"
    >
      Download 3D Files
    </button>
  </div>
</template> 