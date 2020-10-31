import React from "react";
import Store from "./Store";

export default function StoreList({ stores, removeStore }) {
  return (
    <>
      {stores.map((store) => {
        return (
          <Store key={store.uid} store={store} removeStore={removeStore} />
        );
      })}
    </>
  );
}
