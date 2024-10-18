"use client";
import FilterComponents from "@/components/filter-components/FilterComponents";
import { Header } from "@/components/header-components/Header";
import HeroSection from "@/components/herosec-components/Herosection";
import { store } from "@/redux/store";
import Image from "next/image";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection/>
      <Provider store={store}>
        <FilterComponents />
      </Provider>
    </div>
  );
}
