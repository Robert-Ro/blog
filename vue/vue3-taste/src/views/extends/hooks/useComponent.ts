import { ref, onMounted, onUnmounted } from "vue";
import { useEventListener } from "./useEventListener";

// 有状态组件
export function useMouse() {
  const x = ref(0);
  const y = ref(0);
  function update(e: Event) {
    x.value = (e as MouseEvent).pageX;
    y.value = (e as MouseEvent).pageY;
  }
  useEventListener(window, "mousemove", update);

  // NOTE 返回带状态的组件
  // 每一个调用 useMouse() 的组件实例会创建其独有的 x、y 状态拷贝，因此他们不会互相影响
  return { x, y };
}
