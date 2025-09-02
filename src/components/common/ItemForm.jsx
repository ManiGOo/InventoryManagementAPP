import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const validationSchema = Yup.object({
  name: Yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  description: Yup.string(),
  price: Yup.number().positive("Price must be positive").required("Price is required"),
});

function ItemForm({ category_id, onSubmit, initialData = {} }) {
  const [preview, setPreview] = useState(initialData.image_url || null);

  const initialValues = {
    name: initialData.name || "",
    description: initialData.description || "",
    price: initialData.price || "",
    category_id: initialData.category_id || category_id || "",
    image: null,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category_id", values.category_id);
    if (values.image) formData.append("image", values.image);

    try {
      await onSubmit(formData);
      toast.success("Item saved");
      resetForm();
    } catch (err) {
      toast.error("Failed to save item");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e, setFieldValue) => {
    const file = e.currentTarget.files[0];
    setFieldValue("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-5 bg-gray-800 text-gray-100 p-6 rounded-2xl shadow-lg">
            {/* Name */}
            <div>
              <label className="block font-medium mb-1">Name</label>
              <Field
                name="name"
                type="text"
                placeholder="Item name"
                className="w-full border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-1">Description</label>
              <Field
                as="textarea"
                name="description"
                placeholder="Description"
                className="w-full border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="description" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium mb-1">Price</label>
              <Field
                name="price"
                type="number"
                placeholder="Price"
                step="0.01"
                className="w-full border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="price" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Image */}
            <div>
              <label className="block font-medium mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setFieldValue)}
                className="w-full rounded-md px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 h-32 w-full object-cover rounded-md border border-gray-700"
                />
              )}
            </div>

            <Field type="hidden" name="category_id" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {initialData.id ? "Update Item" : "Save Item"}
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}

export default ItemForm;
