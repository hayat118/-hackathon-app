import Explore from "./Explore";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Participate from "./Participate";

function Home() {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <HeroSection />
        <Participate />
        <Explore />
      </div>
    </div>
  );
}

export default Home;
