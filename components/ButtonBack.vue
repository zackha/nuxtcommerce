<template>
  <div class="fixed px-4 mt-4">
    <button @click.prevent="back"><Icon name="ph:arrow-left-bold" size="24" /></button>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();
async function back() {
  router.back();
}
</script>
