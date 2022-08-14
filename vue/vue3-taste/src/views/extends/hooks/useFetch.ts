import { type Ref, ref, watchEffect, watch, unref, isRef } from "vue";
/**
 * 接收静态的 URL 字符串和 URL 字符串的 ref
 * @param url
 * @returns
 */
export function useFetch(url: string | Ref<string>) {
  const data = ref(null);
  const error = ref(null);

  function doFetch() {
    data.value = null;
    error.value = null;

    fetch(unref(url))
      .then((res) => res.json())
      .then((res) => (data.value = res))
      .catch((err) => (error.value = err));
  }
  if (isRef(url)) {
    watchEffect(doFetch);
  } else {
    doFetch();
  }

  return { data, error };
}
