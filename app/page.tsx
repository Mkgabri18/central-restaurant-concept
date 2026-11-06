import React from "react";
import { Navbar } from "@/components/Navbar";
import { RestaurantScroll } from "@/components/RestaurantScroll";
import { Philosophy } from "@/components/Philosophy";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#121621] text-white">
      <Navbar />
      <RestaurantScroll />
      <Philosophy />
      <Experience />
      <Footer />
    </main>
  );
}
