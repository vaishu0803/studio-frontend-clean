import ServicesHero from "./ServicesHero";
import OurServices from "./OurServices";
import MostPopular from "./MostPopular";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Services() {
  return (
    <>
    <Navbar/>
      <ServicesHero />
      <OurServices />
      <MostPopular/>
      <Footer/>
    </>
  );
}
