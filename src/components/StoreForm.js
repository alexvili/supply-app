import React from "react";
import { useForm } from "react-hook-form";
import Error from "./Error";

export default function StoreForm({
  addStore,
  storeValidation,
  isStoreLimitReached,
}) {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values, e) => {
    addStore(values);
    e.target.reset();
  };

  return (
    <div className="store-form card">
      <h2>Add store</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <input
            type="text"
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
        <div className="form-control">
          <input
            type="number"
            name="uid"
            placeholder="Store Unique Identifier"
            ref={register({
              required: {
                value: true,
                message: "Is required.",
              },
              min: {
                value: 100000000,
                message: "Must have 9 digits.",
              },
              max: {
                value: 999999999,
                message: "Must have 9 digits.",
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
        <input
          type="submit"
          value="Add"
          className="btn btn-primary"
          disabled={isStoreLimitReached}
        />
        {isStoreLimitReached && <Error>Maximum number of stores is 8.</Error>}
      </form>
    </div>
  );
}
