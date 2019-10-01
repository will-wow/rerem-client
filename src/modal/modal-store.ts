import {} from "svelte";
import { writable } from "svelte/store";

type Props = { small?: boolean } & Record<string, any>;

interface ModalData {
  component: any;
  small?: boolean;
  props?: Props;
}

type ModalStack = ModalData[];

export const modalStore = writable<ModalStack>([]);

export const openModal = (component: any, props: Props = {}): void => {
  const { small, ...componentProps } = props;
  modalStore.update(stack => {
    const newData: ModalData = {
      component,
      small,
      props: componentProps
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
