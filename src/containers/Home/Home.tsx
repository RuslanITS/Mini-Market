import { Col, Row } from "react-bootstrap";
import Products from "../../components/Products/Products.tsx";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = () => {
  return (
    <Row>
      <Col md={3}><Sidebar /></Col>
      <Col md={9}><Products /></Col>
    </Row>
  );
};

export default Home;