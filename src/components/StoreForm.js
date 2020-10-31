import React from "react";
import { useForm } from "react-hook-form";
import Error from "./Error";

export default function StoreForm({ addStore, storeValidation }) {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => addStore(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input
          name="name"
          placeholder="Store Name"
          ref={register({
            required: { value: true, message: "Is required." },
            minLength: { value: 2, message: "Minimum length is 2." },
            maxLength: {
              value: 100,
              message: "Maximum length is 100",
            },
            validate: async (value) => {
              if (!value) return;
              let res = await storeValidation.checkIfNameExists(value);
              if (res?.data?.exists) return "Already exists!";
            },
          })}
        />
        <Error>{errors?.name?.message}</Error>
      </div>
      <div>
        <label>Unique Identifier</label>
        <input
          name="uid"
          placeholder="Store Unique Identifier"
          type="number"
          ref={register({
            required: {
              value: true,
              message: "Is required.",
            },
            min: {
              value: 100000000,
              message: "Minimum value is 100000000.",
            },
            max: {
              value: 999999999,
              message: "Maximum value is 999999999",
            },
            validate: async (value) => {
              if (!value) return;
              let res = await storeValidation.checkIfUidExists(value);
              if (res?.data?.exists) return "Already exists!";
            },
          })}
        />
        <Error>{errors?.uid?.message}</Error>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
