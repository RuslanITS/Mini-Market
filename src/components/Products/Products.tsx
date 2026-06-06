import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../Products/ProductCard/ProductCard.tsx";
import axiosApi from "../../api/fairbase";
import type { FirebaseProducts, Product } from "../../type";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const response = await axiosApi.get<FirebaseProducts | null>(
      "/products.json"
    );

    const productsData = response.data;

    if (!productsData) {
      setProducts([]);
      return;
    }

    const productsArray = Object.keys(productsData).map(id => ({
      id,
      ...productsData[id],
    }));

    setProducts(productsArray);
  };

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
    };

    void loadProducts();
  }, []);

  return (
    <>
      <h2>Products</h2>

      <Row>
        {products.map(product => (
          <Col
            key={product.id}
            md={4}
            className="mb-3"
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Products;