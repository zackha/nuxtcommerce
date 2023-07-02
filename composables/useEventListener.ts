export function useEventListener(target: EventTarget, event: string, handler: (e: Event) => any) {
  onMounted(() => {
    target.addEventListener(event, handler);
  });

  // clean it up
  onBeforeUnmount(() => {
    target.removeEventListener(event, handler);
  });
}
