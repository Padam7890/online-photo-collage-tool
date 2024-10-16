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

export type FormValues = z.infer<typeof formSchema>;

export default function Component() {
  const [createCollage] = useCreateCollageMutation();
  const [files, setFiles] = useState<File[]>([]);

  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
      columns: "2",
    },
  });

  // Watch for column value changes
  const columns = watch("columns");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, 5); // Limit to 5 files
      setFiles(newFiles);
      setValue("files", newFiles);
    },
    [files, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    maxFiles: parseInt(columns),
    disabled: files.length >= parseInt(columns),
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
      formData.append("files", file); // Note the use of 'files[]'
    });

    // Append other form data if needed
    formData.append("columns", data.columns); // Assuming you want to send columns too

    try {
      // Make the API call to create the collage
      await createCollage(formData).unwrap();
      console.log("Collage created successfully!");
    } catch (error) {
      console.error("Error creating collage:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-3xl mx-auto flex justify-center flex-col">
        <CardContent className="p-6">
          {/* Dropdown for Column Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select Columns</label>
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
                  <option value="2">2 Columns</option>
                  <option value="3">3 Columns</option>
                </select>
              )}
            />
          </div>
          {/* File Dropzone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-primary">Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
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
  );
}
