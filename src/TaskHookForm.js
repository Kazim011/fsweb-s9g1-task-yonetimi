import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";

export default function TaskHookForm({ kisiler, submitFn }) {
  const onSubmit = (data) => {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();
  };
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm({
    mode: "onChange",
  });
  return (
    <div className="form-line">
      <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
        <label className="input-label">
          Başlık
          <input
            id="title"
            className="input-text"
            type="text"
            {...register("title", {
              required: "Task başlığı yazmalısınız",
              minLength: {
                value: 3,
                message: "Başlık en az 3 karakter olmalıdır.",
              },
            })}
          />
          <p className="input-error">
            {errors.title?.required || errors.title?.message}
          </p>
        </label>
        <label className="input-label">
          Açıklama
          <textarea
            className="input-textarea"
            id="description"
            type="text"
            {...register("description", {
              required: "Task açıklaması yazmalısınız",
              minLength: {
                value: 10,
                message: "Task açıklaması en az 10 karakter olmalı",
              },
            })}
          />
          <p className="input-error">
            {errors.description?.required || errors.description?.message}
          </p>
        </label>
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                value={p}
                {...register("people", {
                  required: "Lütfen bir kisi seciniz.",
                  validate: {
                    altsinir: (secimler) =>
                      secimler.length <= 3 || "En fazla 3 kişi seçebilirsiniz.",
                  },
                })}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people?.message}</p>
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </form>
    </div>
  );
}
