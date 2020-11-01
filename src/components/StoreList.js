import React from "react";
import Store from "./Store";

export default function StoreList({ stores, removeStore }) {
  return (
    <div className="store-list card">
      <ul>
        {stores.map((store, i) => {
          return (
            <Store
              key={store.uid}
              index={i + 1}
              store={store}
              removeStore={removeStore}
            />
          );
        })}
      </ul>
    </div>
  );
}
