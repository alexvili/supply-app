import React from "react";

export default function Store({ store, removeStore }) {
  return (
    <div>
      <span>{store.name}</span>-<span>{store.uid}</span>-
      <span>{JSON.stringify(store.waterStockAmount)}</span>
      <button onClick={() => removeStore(store.uid)}>Remove</button>
    </div>
  );
}
