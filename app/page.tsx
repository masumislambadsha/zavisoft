import Hero from "./components/Hero";
import NewDrops from "./components/NewDrops";
import Categories from "./components/Categories";
import Reviews from "./components/Reviews";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <NewDrops />
      <Categories />
      <Reviews />
    </div>
  );
}
