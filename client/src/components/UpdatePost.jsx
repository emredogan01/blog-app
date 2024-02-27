import React, { useState } from "react";
import Select from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { updatePostStore } from "../zustand/updatePost";
import FileBase64 from "react-file-base64";
import { useNavigate } from "react-router-dom";

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
  category: z.string().min(1, "Kategori zorunludur."),
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

const UpdatePost = ({ post, id, handleClose }) => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const update = updatePostStore((store) => store.updatePost);

  const {
    handleSubmit,
    control,
    setError,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post?.title || "",
      subTitle: post?.subTitle || "",
      category: post?.category || "",
      text: post?.text || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const updatedData = { ...data, image: file };
      await update(id, updatedData);
      navigate("/posts");
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="container mx-auto p-10 bg-gray-700 mt-10 rounded-md flex flex-wrap gap-10 justify-center w-[1000px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full"
      >
        <h2 className="text-2xl text-white  font-bold mb-4">Post Güncelle</h2>
        <p className="text-white">
          Lütfen güncellemek istediğiniz post içeriğini aşağıya giriniz.
        </p>
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
              defaultValue={post?.category}
            />
          )}
        />
        {errors.category && (
          <div className="text-red-500">{errors.category.message}</div>
        )}
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="w-full outline-none border-2 border-blue-300 rounded-md p-2 min-h-[200px]  max-h-[400px]"
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
            className="text-green-500 bg-gray-300 p-2 w-40 rounded-md"
          >
            {isSubmitting ? "Yükleniyor..." : "Kaydet"}
          </button>
          <button
            onClick={handleClose}
            className="text-red-500 bg-gray-300 p-2 w-40 rounded-md"
          >
            Kapat
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
