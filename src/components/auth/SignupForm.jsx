import { useContext } from 'react';
import AuthForm from './AuthForm.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  username: Yup.string().min(3).required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6).required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm your password'),
});

function SignupForm() {
  const { handleSignup, handleGoogleSignup, handleGithubSignup } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = { username: '', email: '', password: '', confirmPassword: '' };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await handleSignup(values.username, values.email, values.password);
      navigate('/dashboard');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthForm
      type="signup"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      socialLoginHandlers={{ google: handleGoogleSignup, github: handleGithubSignup }}
    />
  );
}

export default SignupForm;