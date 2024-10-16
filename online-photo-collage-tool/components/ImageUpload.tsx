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

// Zod Schema for form validation
const formSchema = z.object({
  files: z.array(z.instanceof(File)).max(5, "You can upload up to 5 files"), 
  columns: z.enum(["2", "3"]).default("2"), 
});

type FormValues = z.infer<typeof formSchema>;

export default function Component() {
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
    maxFiles: 5,
    disabled: files.length >= 5,
  });

  const removeFile = (file: File) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
    setValue("files", newFiles);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  return (
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
              <div
                className={`grid grid-cols-${columns} gap-4`} // Adjust grid based on column selection
              >
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
