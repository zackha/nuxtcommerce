<template>
  <button @click.prevent="back"><Icon name="majesticons:arrow-left-line" size="24" /></button>
</template>
<script setup lang="ts">
const router = useRouter();
async function back() {
  router.back();
}
</script>
