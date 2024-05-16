import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Crud = () => {
  const initialFormData = {
    sold: 0,
    ratingsQuantity: 0,
    title: "",
    slug: "",
    description: "",
    quantity: 100,
    price: 0,
    imageCover: "",
    category: { _id: "" },
    brand: { _id: "" },
    ratingsAverage: 4.8,
  };

  const [formData, setFormData] = useState(initialFormData);
  const history = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "imageCover") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await axios.post(
        "https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/products",
        formDataToSend
      );
      console.log(response.data);
      setFormData(initialFormData);
      // history.push("/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
      <div className="container my-5 text-black">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h4 className="mb-3 text-center">Add Product</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="add-title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="add-title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="add-price" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="add-price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="add-desc" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="add-desc"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="add-slug" className="form-label">
                  Slug
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="add-slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="add-img" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="add-img"
                  name="imageCover"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="add-quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="add-quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="add-category" className="form-label">
                  Category ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="add-category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="add-brand" className="form-label">
                  Brand ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="add-brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary d-block w-100">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Crud;
