import { Link, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "../redux/feature/productApi";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const params = useParams();
  const { data, isLoading } = useGetProductByIdQuery(params && params?.id);
  const [deleteProduct,{isSuccess:SuccessDel}] = useDeleteProductMutation();

  if (isLoading) {
    return <h1 className="h-[100vh] w-full customCenter">Loading...</h1>;
  }

  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  if (SuccessDel) {
    toast("Deleted SuccessFully", {
      toastId: "delete"
    })
  }

  return (
    <div className="w-full customCenter flex-col px-[200px]">
      <Link to="/" className="bg-black text-white px-5 mt-5">
        Back
      </Link>
      <h1 className="text-[22px] mt-10">Product Detail</h1>
      <img className="w-[200px] h-[200px]" src={data?.image} alt="img" />
      <p className="">Title: {data?.title}</p>
      <p className="">price: {data?.price}</p>
      <p className="">Detail: {data?.description}</p>

      <div className="flex">
        <Link
          to={`/update/${data?.id}`}
          className="px-5 py-2 border m-10 bg-gray-200"
        >
          Update
        </Link>
        <button
          onClick={() => handleDelete(data?.id)}
          className="px-5 py-2 border m-10 bg-gray-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
