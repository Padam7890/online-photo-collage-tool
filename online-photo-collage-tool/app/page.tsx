"use client"
import { Header } from "@/components/Header";
import DragDropUploader from "@/components/ImageUpload";
import { store } from "@/redux/store";
import Image from "next/image";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <div>
      <Header/>
      <Provider store={store}>
        <DragDropUploader />
      </Provider>

    </div>
  );
}
