import {} from "svelte";
import { writable } from "svelte/store";

type Props = Record<string, any>;

interface ModalData {
  component: any;
  props?: Props;
}

type ModalStack = ModalData[];

export const modalStore = writable<ModalStack>([]);

export const openModal = (component: any, props?: Props): void => {
  modalStore.update(stack => {
    const newData: ModalData = {
      component,
      props
    };
    stack.push(newData);
    return stack;
  });
};

export const closeModal = () => {
  modalStore.update(stack => {
    stack.pop();
    return stack;
  });
};
