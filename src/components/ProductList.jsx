import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetProductByCategoryQuery,
  useGetProductCategoriesQuery,
} from "../redux/feature/productApi";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductList = () => {
  const [limitVal, setLimitVal] = useState(3);
  const [categoriesVal, setCategoriesVal] = useState(null);
  const { data, isLoading } = useGetAllProductsQuery({ limitVal });
  const { data: categoryDataCard, isLoading: catLoading } =
    useGetProductByCategoryQuery({ limitVal, categoriesVal });

  const { data: categoryData } = useGetProductCategoriesQuery();

  const [deleteProduct, { isSuccess: SuccessDel }] = useDeleteProductMutation();

  if (isLoading || catLoading) {
    return <h1 className="h-[100vh] w-full customCenter">Loading...</h1>;
  }
  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  if (SuccessDel) {
    toast("Deleted SuccessFully", {
      toastId: "delete1",
    });
  }

  return (
    <div className="w-full flex flex-col justify-center  items-center pb-[100px] px-[200px]">
      <h1 className="text-[32px] font-bold">Practise RTK Query</h1>

      <p className="text-center mt-10">Filter Option</p>
      <div className="flex justify-center  items-center">
        <button
          onClick={() => setCategoriesVal(null)}
          className={`px-5 py-2 m-10 border rounded-md ${
            categoriesVal === null ? "bg-blue-200" : "hover:bg-gray-100"
          }`}
        >
          All Data
        </button>
        {categoryData &&
          categoryData?.map((cat) => {
            return (
              <button
                onClick={() => setCategoriesVal(cat)}
                key={cat}
                className={`px-5 py-2 m-10 border rounded-md ${
                  categoriesVal === cat ? "bg-blue-200" : "hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            );
          })}
      </div>

      <h1 className="text-[32px]">
        Products{" "}
        <span className=" font-bold text-gray-500">{data?.length}</span>
      </h1>
      <div className="flex border p-2">
        <label htmlFor="">limit</label>
        <select onChange={(e) => setLimitVal(e.target.value)} name="" id="">
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {data &&
          !categoriesVal &&
          data.map((item) => {
            return (
              <div
                style={{
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "center",
                  alignItems: "center",
                  padding: "10px",
                  margin: "10px",
                  borderRadius: "10px",
                }}
                key={item.title}
                className=""
              >
                <p className="">Title: {item?.title}</p>
                <p className="">Price: {item?.price}</p>
                <p className="">Img: </p>
                <img
                  style={{
                    height: "100px",
                    width: "100px",
                  }}
                  src={item?.image}
                  alt="img"
                />

                <div className="flex gap-2">
                  <Link
                    to={`product-detail/${item?.id}`}
                    className="mt-[20px] border border-blue-600 rounded-md px-2"
                  >
                    <button>View</button>
                  </Link>
                  <div className="mt-[20px] border border-blue-600 rounded-md px-2">
                    <button onClick={() => handleDelete(item?.id)}>
                      Delete
                    </button>
                  </div>
                  <Link
                    to={`/update/${item?.id}`}
                    className="mt-[20px] border border-blue-600 rounded-md px-2"
                  >
                    <button>Update</button>
                  </Link>
                </div>
              </div>
            );
          })}

        {categoriesVal &&
          categoryDataCard &&
          categoryDataCard.map((item) => {
            return (
              <div
                style={{
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "center",
                  alignItems: "center",
                  padding: "10px",
                  margin: "10px",
                  borderRadius: "10px",
                }}
                key={item.title}
                className=""
              >
                <p className="">Title: {item?.title}</p>
                <p className="">Price: {item?.price}</p>
                <p className="">Img: </p>
                <img
                  style={{
                    height: "100px",
                    width: "100px",
                  }}
                  src={item?.image}
                  alt="img"
                />

                <div className="flex gap-2">
                  <Link
                    to={`product-detail/${item?.id}`}
                    className="mt-[20px] border border-blue-600 rounded-md px-2"
                  >
                    <button>View</button>
                  </Link>
                  <div className="mt-[20px] border border-blue-600 rounded-md px-2">
                    <button onClick={() => handleDelete(item?.id)}>
                      Delete
                    </button>
                  </div>
                  <Link
                    to={`/update/${item?.id}`}
                    className="mt-[20px] border border-blue-600 rounded-md px-2"
                  >
                    <button>Update</button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductList;
