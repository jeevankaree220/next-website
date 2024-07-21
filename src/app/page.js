import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/HeroComp";
import Dashboard from "./components/Dashboard";
import Features from "./components/Features";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 px-4 lg:px-8">
      <Header />
      <main className="">
        <Hero />
        <Features />
      </main>
    </div>
  );
}
