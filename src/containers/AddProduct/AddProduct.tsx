import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axiosApi from "../../api/fairbase";
import { categories } from "../../constans.ts";

interface ProductForm {
  type: string;
  title: string;
  description: string;
  price: string;
  picture: string;
}

const AddProduct = () => {
  const navigate = useNavigate();

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

  const submitHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !state.type.trim() ||
      !state.title.trim() ||
      !state.price.trim()
    ) {
      toast.error("Please fill required fields!");
      return;
    }

    try {
      await axiosApi.post("/products.json", state);

      toast.success("Product created!");

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed create product!");
    }
  };
  return (
    <Form onSubmit={submitHandler}>
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
          placeholder="Enter product title"
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
          placeholder="Enter description"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Picture URL</Form.Label>

        <Form.Control
          type="text"
          name="picture"
          value={state.picture}
          onChange={changeHandler}
          placeholder="Enter image URL"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>

        <Form.Control
          type="number"
          name="price"
          value={state.price}
          onChange={changeHandler}
          placeholder="Enter price"
        />
      </Form.Group>

      <Button type="submit">Create Product</Button>
    </Form>
  );
};

export default AddProduct;