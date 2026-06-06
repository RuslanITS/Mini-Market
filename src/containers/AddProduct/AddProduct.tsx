import { useState, type ChangeEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { categories } from "../../constans.ts";

interface ProductForm {
  type: string;
  title: string;
  description: string;
  price: string;
  picture: string;
}

const AddProduct = () => {
  const [state, setState] = useState<ProductForm>({
    type: "",
    title: "",
    description: "",
    price: "",
    picture: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Form>
      <h2 className="mb-4">Add New Product</h2>

      <Form.Group className="mb-3">
        <Form.Label>Type</Form.Label>

        <Form.Select
          name="type"
          value={state.type}
          onChange={changeHandler}
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
          onChange={changeHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>

        <Form.Control
          as="textarea"
          rows={4}
          name="description"
          value={state.description}
          onChange={changeHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Picture URL</Form.Label>

        <Form.Control
          type="text"
          name="picture"
          value={state.picture}
          onChange={changeHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>

        <Form.Control
          type="number"
          name="price"
          value={state.price}
          onChange={changeHandler}
        />
      </Form.Group>

      <Button type="button">
        Create Product
      </Button>
    </Form>
  );
};

export default AddProduct;