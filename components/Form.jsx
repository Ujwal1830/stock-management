import React from 'react'

const Form = ({productForm, handleChange, addProduct}) => {
  return (
    <div className="container bg-slate-200 mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Current Stock</h1>
        <form>
          <div className="mb-6">
            <label
              for="slug"
              className="block mb-2 text-sm font-medium text-slate-800"
            >
              Product Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="slug"
              name="slug"
              value={productForm?.slug || ""}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="productQuantity"
              className="block mb-2 text-sm font-medium text-slate-800 "
            >
              Quantity
            </label>
            <input
              onChange={handleChange}
              type="number"
              id="productQuantity"
              name="productQuantity"
              value={productForm?.productQuantity || ""}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="productPrice"
              className="block mb-2 text-sm font-medium text-slate-800 "
            >
              Price
            </label>
            <input
              onChange={handleChange}
              type="number"
              id="productPrice"
              name="productPrice"
              value={productForm?.productPrice || ""}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            onClick={addProduct}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Product
          </button>
        </form>
      </div>
  )
}

export default Form
