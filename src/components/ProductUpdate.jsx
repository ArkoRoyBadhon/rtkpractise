import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../redux/feature/productApi";

const ProductUpdate = () => {
  const [formData, setFormData] = useState({});

  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductByIdQuery(params && params?.id);
  const [updateProduct, { isSuccess: updateSuccess }] =
    useUpdateProductMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const info = { id: params?.id, formData };
    await updateProduct(info);
  };

  if (isLoading) {
    return <h1 className="">Loading...</h1>;
  }

  if (updateSuccess) {
    navigate("/");
  }

  return (
    <div>
      <Link to="/" className="bg-black text-white px-5">
        Back
      </Link>
      <h1 className="">Update Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            className="px-3 py-2 border m-2"
            type="text"
            name="title"
            defaultValue={data?.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            className="px-3 py-2 border m-2"
            type="text"
            name="price"
            defaultValue={data?.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            className="px-3 py-2 border m-2"
            name="description"
            defaultValue={data?.description}
            onChange={handleInputChange}
          />
        </div>
        <button className="px-5 py-2 border m-10 bg-gray-200" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default ProductUpdate;
