import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetProductCategoriesQuery,
} from "../redux/feature/productApi";
import { useState } from "react";

const ProductList = () => {
  const [limitVal, setLimitVal] = useState(2);
  const { data, isLoading } = useGetAllProductsQuery({ limitVal });
  const { data: categoryData } = useGetProductCategoriesQuery();
  const [deleteProduct, { isSuccess: SuccessDel }] = useDeleteProductMutation();
  if (isLoading) {
    return <h1 className="">Loading...</h1>;
  }
  const handleDelete = async (id) => {
    console.log("dd", id);
    await deleteProduct(id);
  };

  if (SuccessDel) {
    console.log("deleted success");
  }

  return (
    <div>
      <h1 className="text-[32px] font-bold">Practise RTK Query</h1>

      <div className="">
        <p className="">Filter Option</p>
        {categoryData &&
          categoryData?.map((cat) => {
            return (
              <button key={cat} className="px-5 py-2 m-10 border">
                {cat}
              </button>
            );
          })}
      </div>

      <h1 className="text-[32px]">
        Products <span>{data?.length}</span>
      </h1>
      <label htmlFor="">limit</label>
      <select onChange={(e) => setLimitVal(e.target.value)} name="" id="">
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="8">8</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <div className=" flex flex-col justify-center items-center">
        {data &&
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
                  width: "600px",
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
