import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axiosApi from "../../api/fairbase";
import type { FirebaseProducts, Product } from "../../type";
import ProductCard from "../Products/ProductCard/ProductCard.tsx";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const { type } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

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
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [type]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

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