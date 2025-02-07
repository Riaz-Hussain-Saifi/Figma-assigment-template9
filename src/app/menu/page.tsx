// src/app/menu/page.tsx
import Dessert from "@/components/ManuPages/Dessert";
import Drink from "@/components/ManuPages/Drinks";
import Experience from "@/components/ManuPages/Experience";
import MainCours from "@/components/ManuPages/MainCourse";
import StarterMenu from "@/components/ManuPages/StartMenu";
import PartnersAndClients from "@/components/ManuPages/PartnerClient";
import Hero from "@/components/ManuPages/MenuHero";

export default function Menu() {
  return (
<div>
  <Hero/>
  <StarterMenu/>
  <MainCours/>
  <Experience/>
  <Dessert/>
  <Drink/>	
  <PartnersAndClients/>
</div>
  );
}




