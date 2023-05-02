<template>
  <div class="mt-4 font-mono">
    <div class="text-sm text-center m-auto">{{ time }}</div>
  </div>
</template>

<script setup>
const formatDate = (date) => {
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

const time = ref(formatDate(new Date()));

setInterval(() => {
  time.value = formatDate(new Date());
}, 1000);
</script>
