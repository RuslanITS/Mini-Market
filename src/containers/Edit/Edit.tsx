import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosApi from "../../api/fairbase";
import ProductForm from "../../components/ProductForm/ProductForm";

interface ProductFormState {
  type: string;
  title: string;
  description: string;
  price: string;
  picture: string;
}

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState<ProductFormState>({
    type: "",
    title: "",
    description: "",
    price: "",
    picture: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosApi.get(`/products/${id}.json`);

        setState({
          type: response.data.type,
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          picture: response.data.picture,
        });
      } catch (e) {
        console.error(e);
      }
    };

    void fetchProduct();
  }, [id]);

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

    try {
      await axiosApi.patch(
        `/products/${id}.json`,
        state
      );

      toast.success("Product updated!");
      navigate("/");
    } catch (e) {
      console.error(e);
      toast.error("Failed to update product!");
    }
  };

  return (
    <ProductForm
      state={state}
      onChange={changeHandler}
      onSubmit={submitHandler}
      isEdit
    />
  );
};

export default Edit;