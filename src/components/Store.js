import React from "react";

export default function Store({ index, store, removeStore }) {
  return (
    <li>
      <span>{index}</span>
      <span>{store.name}</span>
      <span>{store.uid}</span>
      <span className="store-remove">
        <i className="fas fa-trash" onClick={() => removeStore(store.uid)}></i>
      </span>
    </li>
  );
}
