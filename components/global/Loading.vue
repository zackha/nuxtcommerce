<template>
  <svg aria-label="Loading..." role="img" class="loading-animation" viewBox="0 0 100 100">
    <rect height="6" opacity="0" rx="3" ry="3" transform="rotate(-90 50 50)" width="25" x="72" y="47"></rect>
    <rect class="dark:fill-[#555555]" height="6" opacity="0.08333333333333333" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"></rect>
    <rect class="dark:fill-[#555555]" height="6" opacity="0.16666666666666666" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"></rect>
    <rect class="dark:fill-[#555555]" height="6" opacity="0.25" rx="3" ry="3" transform="rotate(0 50 50)" width="25" x="72" y="47"></rect>
    <rect class="dark:fill-[#555555]" height="6" opacity="0.3333333333333333" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"></rect>
    <rect class="dark:fill-[#555555]" height="6" opacity="0.4166666666666667" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"></rect>
    <rect class="dark:fill-[#555555]" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"></rect>
    <rect class="dark:fill-[#555555]" height="6" opacity="0.5833333333333334" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"></rect>
    <rect class="dark:fill-[#555555]" height="6" opacity="0.6666666666666666" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"></rect>
    <rect class="dark:fill-[#555555]" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"></rect>
    <rect class="dark:fill-[#555555]" height="6" opacity="0.8333333333333334" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"></rect>
    <rect class="dark:fill-[#555555]" height="6" opacity="0.9166666666666666" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"></rect>
  </svg>
</template>

<style lang="postcss">
.loading-animation {
  animation-duration: 0.8s;
  animation-timing-function: steps(12, end);
  animation-iteration-count: infinite;
  animation-name: endless-loop;
}

@keyframes endless-loop {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
