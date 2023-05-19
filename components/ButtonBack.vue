<template>
  <button @click.prevent="back">Back</button>
</template>
<script setup lang="ts">
const router = useRouter();
async function back() {
  router.back();
}
</script>
