import { onMounted, onUnmounted } from "vue";

export function useEventListener(
  target: HTMLElement | Window,
  event: keyof HTMLElementEventMap,
  handler: EventListener
) {
  onMounted(() => {
    target.addEventListener(event, handler);
  });
  onUnmounted(() => {
    target.removeEventListener(event, handler);
  });
}
