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
  const initialValues = {
    name: initialData.name || "",
    description: initialData.description || "",
    price: initialData.price || "",
    // category_id comes from props or initialData, no need for UI input
    category_id: initialData.category_id || category_id || "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => val != null && formData.append(key, val));
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
                onChange={e => setFieldValue("image", e.currentTarget.files[0])}
                className="w-full rounded-md px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
            </div>

            {/* Hidden Category (still sent with form) */}
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
