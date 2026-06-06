import { Card } from "react-bootstrap";
import type { Product } from "../../../type";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={product.picture || "https://placehold.co/300x200"}
      />

      <Card.Body>
        <Card.Title>
          {product.title}
        </Card.Title>

        <Card.Text>
          {product.description}
        </Card.Text>

        <strong>
          {product.price} KGS
        </strong>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;