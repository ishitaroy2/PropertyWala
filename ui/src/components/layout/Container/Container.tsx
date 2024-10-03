import NavBar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { GradientBackground } from "../../config/theme";

const Container: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <GradientBackground>
        <NavBar />
        {children}
        <Footer />
      </GradientBackground>
    </>
  );
};

export default Container;
