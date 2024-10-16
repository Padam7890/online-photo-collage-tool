"use client"
import DragDropUploader from "@/components/ImageUpload";
import { store } from "@/redux/store";
import Image from "next/image";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <div>
      <Provider store={store}>
        <DragDropUploader />
      </Provider>
    </div>
  );
}
