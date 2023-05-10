<template>
  <div class="mt-4 font-mono">
    <div class="m-auto text-center text-sm">{{ time }}</div>
  </div>
</template>

<script setup lang="ts">
const formatDate = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Los_Angeles',
    timeZoneName: 'short',
  });
  let formatted = formatter.format(date);
  formatted = formatted.replace(/,/g, '');
  return formatted;
};

const time = ref<string>(formatDate(new Date()));

const updateTime = (): void => {
  time.value = formatDate(new Date());
};

onMounted(() => {
  setInterval(updateTime, 1000);
});
</script>
