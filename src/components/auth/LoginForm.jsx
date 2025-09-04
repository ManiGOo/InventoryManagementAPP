import { useContext } from "react";
import AuthForm from "./AuthForm.jsx"; // default import
import { AuthContext } from "../../context/AuthContext.jsx";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  loginInput: Yup.string().required("Username or Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

function LoginForm() {
  const { handleLogin, handleGoogleLogin, handleGithubLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = { loginInput: "", password: "" };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await handleLogin(values.loginInput, values.password);
      navigate("/dashboard");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthForm
      type="login"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      socialLoginHandlers={{ google: handleGoogleLogin, github: handleGithubLogin }}
    />
  );
}

export default LoginForm;
