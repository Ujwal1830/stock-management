'use client'

import Form from "@/components/Form";
import Header from "@/components/Header";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [productForm, setProductForm] = useState({
    slug: '',
    productQuantity: 0,
    productPrice: 0,
  });
  const [allProducts, setAllProducts] = useState([]);
  const [alert, setAlert] = useState("alert");
  const [openModel, setOpenModel] = useState(false);
  const [dropDown, setDropDown] = useState([]);
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState(false)

  useEffect(()=>{
    const fetchAllProducts=async()=>{
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setAllProducts(data.allProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchAllProducts();
  },[])

  const addProduct =async(e)=>{
    e.preventDefault();
    if(productForm.slug.length <= 0 || productForm.productQuantity <= 0 || productForm.productPrice <= 0){
      return 
    }
    try {
      console.log(productForm);
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productForm),
      });
      if(response.ok){
        console.log('Product added successfully');
        setAlert("Your product has been added !!🥳");
        document.getElementById('my_modal_4').showModal();
        setProductForm({});
      } else {
        console.log('Error adding products');
        setAlert("Error encountered !!😒");
        document.getElementById('my_modal_4').showModal();
      }
    } catch (error) {
      console.log("Error :: "+error);
    }

    
  }
  const handleChange =(e)=>{
    setProductForm({...productForm, [e.target.name]: e.target.value})
  }


  const onDropDownEdit = async(e) => {
    if(query===""){ setDropDown([]); }
    setQuery(e.target.value);
    if(query?.length >= 3){
      try {
        setLoading(true);
        setDropDown([]);
        const response = await fetch('/api/search?query='+query);
        const result = await response.json();
        console.log(result.products);
        setDropDown(result.products);
        setLoading(false);
      } catch (error) {
        
      }
    } else {
      setDropDown([]);
    }
  }

  const buttonAction=async(action, slug, initialQuantity)=>{
    //Immediate change the quantity in product
    let index = allProducts.findIndex((item) => item.slug === slug);
    let newProducts = JSON.parse(JSON.stringify(allProducts));
    if(action == "plus"){
      newProducts[index].productQuantity = initialQuantity + 1;
    }else{
      newProducts[index].productQuantity = initialQuantity - 1;
    }
    setAllProducts(newProducts);

    //Immediate change the quantity in dropdown
    if(dropDown){
      let indexdrop = dropDown.findIndex((item) => item.slug === slug);
      let newDropdown = JSON.parse(JSON.stringify(dropDown));
      if(action == "plus"){
        console.log(newDropdown[indexdrop])
        newDropdown[indexdrop].productQuantity = initialQuantity + 1;
      }else{
        newDropdown[indexdrop].productQuantity = initialQuantity - 1;
      }
      setDropDown(newDropdown);
    }

    console.log(action, slug, initialQuantity);
    setLoadingAction(true);
    const response = await fetch('/api/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({action, slug, initialQuantity}),
    });
    const result = await response.json();
    console.log(result);
    setLoadingAction(false);
  }
  

  return (
    <>
      {/* Modal pop-up */}
        <dialog id="my_modal_4" className=" bg-black bg-opacity-60 rounded-2xl">
          <div className="modal-box w-fit p-16">
            <form method="dialog"><button onClick={()=>{setOpenModel(!openModel)}} className="btn btn-sm btn-circle text-xl btn-primary absolute right-4 top-3 text-white">✕</button></form>
            <span className="text-white bg-green-700 p-3 rounded-lg shadow-lg">{alert}</span>
          </div>
        </dialog>
      
      {/* Header OR NavBar */}
      <Header />

      {/* Search the product */}
      <div className="container mx-auto mb-8 p-4 bg-slate-400">
        <h1 className="text-3xl font-bold text-center mb-4">
          Search a Product
        </h1>
        <div className="w-full flex items-center justify-center mb-1">
          <input
            type="text"
            // onBlur={()=>{setDropDown([])}}
            onChange={onDropDownEdit}
            placeholder="Search for a product..."
            className="w-3/4 md:w-4/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <select className="w-1/4 md:w-1/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
          { loading && <div className="flex justify-center bg-green-500">
                <span>Loading.....</span>
              </div>
          }
          {dropDown && dropDown.map((item)=>{
            return <div key={item._id} className="container flex justify-between bg-purple-300 my-1 rounded-lg p-3 border border-b-4">
              <span className="slug">{item.slug} ( {item.productQuantity} available for {item.productPrice} )</span>
              <div className="flex justify-center items-center gap-2">
                <button onClick={()=>{buttonAction("minus", item.slug, item.productQuantity)}} disabled={loadingAction} className="disabled:bg-purple-300 cursor-pointer bg-purple-500 px-3 pt-1 pb-2 rounded-lg shadow-lg shadow-purple-800">-</button>
                <span className="w-6 text-center" >{item.productQuantity}</span>
                <button onClick={()=>{buttonAction("plus", item.slug, item.productQuantity)}} disabled={loadingAction} className="disabled:bg-purple-300 cursor-pointer bg-purple-500 px-3 pt-1 pb-2 rounded-lg shadow-lg shadow-purple-800">+</button>
              </div>
            </div>
          })}
      </div>

      {/* Add Product */}
      <Form 
        productForm={productForm} 
        handleChange={handleChange} 
        addProduct={addProduct} 
      />

      {/* Display Currect Stock */}
      <div className="container my-8 bg-slate-400 mx-auto p-2">
        <h1 className="text-3xl font-bold text-center mb-4">
          Display Current Stock
        </h1>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {allProducts && allProducts.map((item) => (
              <tr key={item.slug}>
                <td className="border px-4 py-2">{item.slug}</td>
                <td className="border px-4 py-2">{item.productQuantity}</td>
                <td className="border px-4 py-2">{item.productPrice}</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </>
  );
}
