import type { SyntheticEvent, ChangeEvent, } from "react";
import { Button, Form } from "react-bootstrap";
import { categories } from "../../constans";

interface ProductFormProps {
  state: {
    type: string;
    title: string;
    description: string;
    price: string;
    picture: string;
  };

  onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;

  onChange: (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => void;

  isEdit?: boolean;
}

const ProductForm = ({state, onSubmit, onChange, isEdit = false,}: ProductFormProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <h2 className="mb-4">
        {isEdit ? "Edit Product" : "Add New Product"}
      </h2>

      <Form.Group className="mb-3">
        <Form.Label>Type</Form.Label>

        <Form.Select
          name="type"
          value={state.type}
          onChange={onChange}
        >
          <option value="">Select category</option>

          {categories.map(category => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.title}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>

        <Form.Control
          type="text"
          name="title"
          value={state.title}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>

        <Form.Control
          as="textarea"
          rows={4}
          name="description"
          value={state.description}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Picture URL</Form.Label>

        <Form.Control
          type="text"
          name="picture"
          value={state.picture}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>

        <Form.Control
          type="number"
          name="price"
          value={state.price}
          onChange={onChange}
        />
      </Form.Group>

      <Button type="submit">
        {isEdit ? "Save Changes" : "Create Product"}
      </Button>
    </Form>
  );
};

export default ProductForm;