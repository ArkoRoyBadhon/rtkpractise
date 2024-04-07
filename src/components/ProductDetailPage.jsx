import {  Link, useParams } from 'react-router-dom';
import { useDeleteProductMutation, useGetProductByIdQuery } from '../redux/feature/productApi';

const ProductDetailPage = () => {
    const params = useParams();
    const {data, isLoading} = useGetProductByIdQuery(params && params?.id)
    const [deleteProduct] = useDeleteProductMutation()

    if(isLoading) {
        return <h1 className="">Loading....</h1>
    }

    const handleDelete = async (id) => {
        await deleteProduct(id)
    }

    return (
        <div>
            <Link to="/" className='bg-black text-white px-5'>Back</Link>
            <h1 className="text-[22px]">Product Detail</h1>
            <img className='w-[200px] h-[200px]' src={data?.image} alt="img" />
            <p className="">Title: {data?.title}</p>
            <p className="">price: {data?.price}</p>
            <p className="">Detail: {data?.description}</p>

            <button className='px-5 py-2 border m-10'>Update</button>
            <button onClick={()=> handleDelete(data?.id)} className='px-5 py-2 border m-10'>Delete</button>
        </div>
    );
};

export default ProductDetailPage;