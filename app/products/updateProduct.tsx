"use client"
import { useState, SyntheticEvent } from "react"
import type { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from 'sweetalert2'

type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
}

const UpdateProduct = ({brands, product}: {brands: Brand[]; product: Product}) => {
    const [title, setTitle] = useState(product.title)
    const [price, setPrice] = useState(product.price)
    const [brand, setBrand] = useState(product.brandId)
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put(`api/products/${product.id}`, {
            title: title,
            price: Number(price),
            brandId: Number(brand)
        }).then(function(response) {
            Swal.fire({
                title: 'Success!',
                text: 'Product has been updated',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        }).catch(function(error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.error,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        })

        router.refresh();
        setIsOpen(false);
    }

    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <button className="btn btn-info btn-sm" onClick={handleModal}>
                Edit
            </button>

            <div className={isOpen? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update {product.title}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Name</label>
                            <input type="text" className="input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product Name" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Price</label>
                            <input type="text" className="input input-bordered" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select value={brand} onChange={(e) => setBrand(Number(e.target.value))} className="select select-bordered" required>
                                <option value="" disabled>Select a brand</option>
                                {brands.map((brand) => (
                                    <option value={brand.id} key={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct