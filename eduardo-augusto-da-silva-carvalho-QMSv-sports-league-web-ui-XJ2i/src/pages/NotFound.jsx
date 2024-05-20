import styled from "styled-components";
import NotFoundImage from "../assets/404.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <Container>
      <Navbar />
      <div className="bg-notfound">
        <img src={NotFoundImage} alt="Not found image" />
      </div>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  .bg-notfound {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
  }
`;
