"use client";

import { Provider } from "react-redux";
import { useEffect } from "react";
import { hydrateCart, loadCartItems, saveCartItems, selectCartItems } from "@/entities/cart";
import { store } from "../store/store";

type Props = {
  children: React.ReactNode;
};

export const StoreProvider = ({ children }: Props) => {
  useEffect(() => {
    store.dispatch(hydrateCart(loadCartItems()));

    let previousItems = selectCartItems(store.getState());
    const unsubscribe = store.subscribe(() => {
      const items = selectCartItems(store.getState());
      if (items !== previousItems) {
        previousItems = items;
        saveCartItems(items);
      }
    });

    return unsubscribe;
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
