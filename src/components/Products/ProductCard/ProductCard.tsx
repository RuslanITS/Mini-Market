import { Badge, Card } from "react-bootstrap";
import { PencilSquare, TrashFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import type { Product } from "../../../type";

interface Props {
  product: Product;
  onDelete: (id: string) => void;
}

const ProductCard = ({ product, onDelete }: Props) => {
  return (
    <Card className="h-100 shadow border-0">
      <Card.Img
        variant="top"
        src={product.picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQugl3fzLFv3rT4O2jpsPFhDPaemnxLiev9AQ&s"}
        style={{
          aspectRatio: "16/9",
          objectFit: "cover",
        }}
      />

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Badge bg="secondary">
            {product.type}
          </Badge>

          <div className="d-flex gap-2">
            <Link
              to={`/products/${product.id}/edit`}
            >
              <PencilSquare size={25} />
            </Link>

            <button
              type="button"
              className="border-0 bg-transparent text-danger p-0"
              onClick={() => onDelete(product.id)}
            >
              <TrashFill size={25} />
            </button>
          </div>
        </div>

        <Card.Title className="fw-bold mb-3">
          {product.title}
        </Card.Title>

        <Card.Text className="text-muted flex-grow-1">
          {product.description || "No description"}
        </Card.Text>

        <div className="border-top pt-3 mt-auto">
          <h4 className="mb-0 fw-bold text-success">
            {product.price} KGS
          </h4>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;