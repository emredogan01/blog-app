import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "../zustand/formState";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import useStorePost from "../zustand/formPost";

const tags = [
  "Programlama",
  "Teknoloji",
  "Web Geliştirme",
  "Yapay Zeka",
  "Veri Bilimi",
  "Mobil Geliştirme",
  "Oyun Geliştirme",
];
const schema = z.object({
  title: z.string().min(1, "Başlık zorunludur."),
  subTitle: z.string().min(1, "Alt başlık zorunludur."),
  category: z.string(tags),
  text: z
    .string()
    .min(20, "En az 20 karakter girmelisiniz.")
    .max(200, "En fazla 200 karakter girebilirsiniz."),
});

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "2px solid #93C5FD",
    borderRadius: "6px",
    boxShadow: state.isFocused ? "none" : provided.boxShadow,
    "&:hover": {
      borderColor: "#93C5FD",
    },
  }),
};

const AddPostFrom = () => {
  const { closeForm } = useStore();
  const pushData = useStorePost((data) => data.postData);
  const [file, setFile] = useState(null);

  const {
    handleSubmit,
    control,
    setError,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      pushData({ ...data, image: file });
      console.log({ ...data, image: file });
      closeForm();
    } catch (error) {
      setError("root");
    }
  };
  const handleClose = () => {
    closeForm();
    reset();
    setFile(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg flex flex-col gap-3"
      >
        <h2 className="text-2xl font-bold mb-4">Post Ekle</h2>
        <p>Lütfen eklemek istediğiniz post içeriğini aşağıya giriniz.</p>
        <input
          {...register("title", { required: true })}
          className="w-full outline-none  border-2 border-blue-300 rounded-md p-2"
          type="text"
          placeholder="Başlık"
        />
        {errors.title && (
          <div className="text-red-500">{errors.title.message}</div>
        )}
        <input
          {...register("subTitle", { required: true })}
          className="w-full outline-none border-2 border-blue-300 rounded-md p-2"
          type="text"
          placeholder="Alt Başlık"
        />
        {errors.subTitle && (
          <div className="text-red-500">{errors.subTitle.message}</div>
        )}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Kategori Seçiniz"
              styles={customStyles}
              onChange={(selectedOption) =>
                field.onChange(selectedOption.label)
              }
              value={tags.find((tag) => tag === field.label)}
              options={tags.map((tag) => ({ value: tag, label: tag }))}
            />
          )}
        />
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="w-full outline-none border-2 border-blue-300 rounded-md p-2 max-h-[200px]"
              placeholder="Lütfen 20 ila 200 karakter arası bir içerik girin."
            />
          )}
        />
        {errors.text && (
          <div className="text-red-500">{errors.text.message}</div>
        )}
        <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />

        <div className="flex justify-between">
          <button
            type="submit"
            className="text-green-500 bg-slate-700 p-2 w-40 rounded-md"
          >
            {isSubmitting ? "Yükleniyor..." : "Ekle"}
          </button>
          <button
            onClick={handleClose}
            className="text-red-500 bg-slate-700 p-2 w-40 rounded-md"
          >
            Kapat
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostFrom;
