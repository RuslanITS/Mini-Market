import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosApi from "../../api/fairbase";
import { categories } from "../../constans";
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
          url = `/products.json?orderBy="type"&equalTo="${type}"`
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
      } catch{
        toast.error('error');
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

  const deleteProduct = async (id: string) => {
    try {
      await axiosApi.delete(`/products/${id}.json`);

      setProducts(prev =>
        prev.filter(product => product.id !== id)
      );
      toast.success("Product deleted!");
    } catch (e) {
      console.error(e);
      toast.error('Error deleted')
    }
  };

  if (!loading && products.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3>No products found</h3>

        <NavLink
          to="/add"
          className="btn btn-primary"
        >
          Add Product
        </NavLink>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">
        {type
          ? categories.find(category => category.id === type)?.title
          : "All Products"}
      </h2>

      <Row>
        {products.map(product => (
          <Col
            key={product.id}
            md={4}
            className="mb-3"
          >
            <ProductCard
              product={product}
              onDelete={deleteProduct}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Products;