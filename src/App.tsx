import './App.css';
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer/Footer.tsx";
import Edit from "./containers/Edit/Edit.tsx";
import Home from "./containers/Home/Home.tsx";
import Header from "./components/Header/Header";
import Add from "./containers/AddProduct/AddProduct.tsx";

const App = () => (
  <div className="app">
    <Header />

    <main className="content">
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:type" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route
            path="/products/:id/edit"
            element={<Edit />}
          />
        </Routes>
      </Container>
    </main>
    <Footer />
  </div>
);

export default App;