import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

function AuthForm({ type, initialValues, validationSchema, onSubmit, socialLoginHandlers }) {
    const [showPassword, setShowPassword] = useState(false);

    const isLogin = type === 'login';
    const submitText = isLogin ? 'Login' : 'Signup';
    const redirectLink = isLogin ? '/signup' : '/login';
    const redirectText = isLogin ? "Don't have an account?" : 'Already have an account?';

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-6">
                    
                    {/* LOGIN MODE: Username or Email */}
                    {isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Username or Email
                            </label>
                            <Field
                                name="loginInput"
                                placeholder="Enter your username or email"
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <ErrorMessage
                                name="loginInput"
                                component="p"
                                className="text-red-400 text-sm mt-1 italic"
                            />
                        </div>
                    )}

                    {/* SIGNUP MODE: Username + Email */}
                    {!isLogin && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                                <Field
                                    name="username"
                                    placeholder="Choose a username"
                                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <ErrorMessage
                                    name="username"
                                    component="p"
                                    className="text-red-400 text-sm mt-1 italic"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="text-red-400 text-sm mt-1 italic"
                                />
                            </div>
                        </>
                    )}

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <div className="relative">
                            <Field
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <ErrorMessage
                            name="password"
                            component="p"
                            className="text-red-400 text-sm mt-1 italic"
                        />
                    </div>

                    {/* Confirm Password (Signup only) */}
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                            <Field
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="p"
                                className="text-red-400 text-sm mt-1 italic"
                            />
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? `${submitText}...` : submitText}
                    </button>

                    {/* Social logins */}
                    {socialLoginHandlers && (
                        <div className="flex flex-col space-y-3 mt-4">
                            {socialLoginHandlers.google && (
                                <button
                                    type="button"
                                    onClick={socialLoginHandlers.google}
                                    className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white flex items-center justify-center space-x-2 transition"
                                >
                                    <span>{isLogin ? 'Login with Google' : 'Signup with Google'}</span>
                                </button>
                            )}
                            {socialLoginHandlers.github && (
                                <button
                                    type="button"
                                    onClick={socialLoginHandlers.github}
                                    className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white flex items-center justify-center space-x-2 transition"
                                >
                                    <span>{isLogin ? 'Login with GitHub' : 'Signup with GitHub'}</span>
                                </button>
                            )}
                        </div>
                    )}

                    {/* Redirect */}
                    <p className="text-sm text-gray-400 text-center mt-4">
                        {redirectText}{' '}
                        <Link to={redirectLink} className="text-blue-400 hover:underline">
                            {isLogin ? 'Signup' : 'Login'}
                        </Link>
                    </p>
                </Form>
            )}
        </Formik>
    );
}

export default AuthForm;