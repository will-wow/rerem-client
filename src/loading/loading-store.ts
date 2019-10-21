import { writable, derived } from "svelte/store";

const loadingStore = writable(0);

export const isLoadingStore = derived(loadingStore, loading => loading > 0);
export const startLoading = () => loadingStore.update(n => n + 1);
export const finishLoading = () => loadingStore.update(n => n - 1);
