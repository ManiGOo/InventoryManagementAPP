import { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  username: Yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function SignupForm() {
  const { handleSignup } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await handleSignup(values.username, values.password);
      navigate('/login');
    } catch (err) {
      console.error('Signup form error:', err.response?.data || err.message);
      setFieldError('username', err.response?.data?.error || 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <Field
              name="username"
              className="w-full p-2 border rounded"
              placeholder="Username"
            />
            <ErrorMessage name="username" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <Field
              type="password"
              name="password"
              className="w-full p-2 border rounded"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Signup
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default SignupForm;