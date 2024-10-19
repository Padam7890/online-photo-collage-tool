"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/types/formtype";
import { useCreateCollageMutation } from "@/redux/api/collage-maker";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FilterSlider from "./FilterSlider";

gsap.registerPlugin(ScrollTrigger);

export type FormValues = z.infer<typeof formSchema>;

export default function FilterComponents() {
  const [createCollage, { data, isLoading, isError, isSuccess, error }] =
    useCreateCollageMutation();
  const [files, setFiles] = useState<File[]>([]);

  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
      columns: "grid_2x2",
    },
  });

  // Watch for column value changes
  const columns = watch("columns");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, 7);
      setFiles(newFiles);
      setValue("files", newFiles);
    },
    [files, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    maxFiles: 6,
    disabled: files.length >= 7,
  });

  const removeFile = (file: File) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
    setValue("files", newFiles);
  };

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data);

    // Create a FormData object
    const formData = new FormData();

    // Append each file in the files array to the FormData object
    files.forEach((file) => {
      formData.append("files", file);
    });

    // Append other form data if needed
    formData.append("columns", data.columns);

    try {
      // Make the API call to create the collage
      await createCollage(formData).unwrap();
      console.log("Collage created successfully!");
    } catch (error) {
      console.error("Error creating collage:", error);
    }
  };


  return (
    <>
      <section className="filter-container bg-[#f9dcc42d]">
        <FilterSlider/>
        <div className=" container h-screen  flex flex-col justify-center items-center mb-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="w-full max-w-3xl mx-auto flex justify-center flex-col">
              <CardContent className="p-6">
                {/* Dropdown for Column Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Select Columns
                  </label>
                  <Controller
                    name="columns"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="border rounded px-3 py-2"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          // Reset files when column value changes
                          setFiles([]);
                          setValue("files", []);
                        }}
                      >
                        <option value="grid_2x2">2 Grid 2x2</option>
                        <option value="horizontal_3">horizontal 3</option>
                        <option value="vertical_stack">vertical Stack</option>
                        <option value="3x3_grid">grid 3x3</option>
                        <option value="polaroid_frame">polaroid_frame</option>
                      </select>
                    )}
                  />
                </div>
                {/* File Dropzone */}
                <div
                  {...getRootProps()}
                  className={`draggable-container border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-primary bg-primary/10"
                      : "border-gray-300"
                  }`}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p className="text-primary">Drop the files here ...</p>
                  ) : (
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  )}
                  <Button className="mt-4" variant="outline">
                    Select Files
                  </Button>
                </div>

                {/* File Previews */}
                {files.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Previews:</h3>
                    <div className={`grid grid-cols-${columns} gap-4`}>
                      {files.map((file, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            width={200}
                            height={200}
                            className="rounded-lg object-cover w-full h-40"
                          />
                          <button
                            onClick={() => removeFile(file)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <Button type="submit" className="mt-6">
                Submit
              </Button>
            </Card>
          </form>
          <div className="showimages">
            {data && isSuccess && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Collage Created:</h3>
                <div className={`grid grid-cols-${columns} gap-4`}>
                  <div className="relative group">
                    <Image
                      src={data.data.imageUrl}
                      alt={`Collage Image ${data.data.imageUrl}`}
                      width={400}
                      height={400}
                      className="rounded-lg object-cover w-100 h-auto"
                    />
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="mt-8">
                <p className="text-red-500">Error creating collage</p>
              </div>
            )}
            {isLoading && (
              <div className="mt-8">
                <p>Creating collage...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
