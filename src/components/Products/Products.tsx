import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../Products/ProductCard/ProductCard.tsx";
import axiosApi from "../../api/fairbase";
import type { FirebaseProducts, Product } from "../../type";
import { useParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { type } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let url = "/products.json";

      if (type) {
        url = `/products.json?orderBy="type"&equalTo="${type}"`;
      }

      const response = await axiosApi.get<FirebaseProducts | null>(url);

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

    void fetchData();
  }, [type]);

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