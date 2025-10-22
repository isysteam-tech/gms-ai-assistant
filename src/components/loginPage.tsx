// import React, { useState } from "react";
// import axios from "axios";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { MdError, MdLightbulb } from "react-icons/md";

// interface LoginForm {
//   username: string;
//   password: string;
// }

// interface LoginResponse {
//   id: number;
//   username: string;
//   role: string;
//   accessToken: string;
//   refreshToken: string;
// }

// const LoginPage: React.FC = () => {
//   const [form, setForm] = useState<LoginForm>({
//     username: "",
//     password: "",
//   });

//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     // Clear error when user starts typing
//     if (error) setError(null);
//   };

//   const handleSubmit = async (): Promise<void> => {
//     setError(null);

//     // Client-side validation
//     if (!form.username || !form.password) {
//       setError("Please enter both username and password");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Replace with your actual API endpoint
//       const response = await axios.post<LoginResponse>(
//         "http://localhost:3000/gms-core/users/login", // Update this URL to match your backend
//         {
//           username: form.username,
//           password: form.password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Store tokens and user info in localStorage
//       localStorage.setItem("token", response.data.accessToken);
//       localStorage.setItem("refreshToken", response.data.refreshToken);
//       localStorage.setItem("userId", response.data.id.toString());
//       localStorage.setItem("username", response.data.username);
//       localStorage.setItem("role", response.data.role);

//       // Redirect to dashboard
//       window.location.href = "/dashboard";
//     } catch (err: any) {
//       setIsLoading(false);

//       // Handle different types of errors
//       if (err.response) {
//         // Server responded with error
//         const status = err.response.status;
//         const errorData = err.response.data;

//         if (status === 400) {
//           // Bad Request - validation error
//           if (errorData.missingFields) {
//             setError(`Missing fields: ${errorData.missingFields.join(", ")}`);
//           } else {
//             setError(errorData.message || "Please check your input");
//           }
//         } else if (status === 401) {
//           // Unauthorized - invalid credentials
//           setError("Invalid username or password");
//         } else if (status === 500) {
//           // Internal Server Error
//           setError("Server error. Please try again later");
//         } else {
//           setError("An unexpected error occurred");
//         }
//       } else if (err.request) {
//         // Request made but no response
//         setError("Cannot connect to server. Please check your connection");
//       } else {
//         // Something else happened
//         setError("An error occurred. Please try again");
//       }

//       console.error("Login error:", err);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
//     if (e.key === "Enter" && !isLoading) {
//       handleSubmit();
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
//         <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: "4s" }}></div>
//       </div>

//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
//         {/* Header Section */}
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-10 text-center">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4">
//             <MdLightbulb className="w-12 h-12 text-purple-600" />
//           </div>
//           <h1 className="text-3xl font-bold text-white mb-2">GMS AI Assistant</h1>
//           <p className="text-purple-100 text-sm">Get Smart Recommendations For Your Grant Application</p>
//         </div>

//         {/* Form Section */}
//         <div className="px-8 py-10">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back</h2>
//           <p className="text-gray-500 text-sm mb-8">Sign in to continue to your dashboard</p>

//           {error && (
//             <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
//               <p className="text-sm text-red-600 flex items-center">
//                 <MdError className="w-5 h-5 mr-2 flex-shrink-0" />
//                 <span>{error}</span>
//               </p>
//             </div>
//           )}

//           <div className="mb-5">
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               name="username"
//               placeholder="Enter your username"
//               value={form.username}
//               onChange={handleChange}
//               onKeyPress={handleKeyPress}
//               disabled={isLoading}
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={form.password}
//               onChange={handleChange}
//               onKeyPress={handleKeyPress}
//               disabled={isLoading}
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
//             />
//           </div>

//           <div className="flex items-center justify-between mb-6">
//             <label className="flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 disabled={isLoading}
//                 className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 disabled:cursor-not-allowed"
//               />
//               <span className="ml-2 text-sm text-gray-600">Remember me</span>
//             </label>
//             <button
//               type="button"
//               disabled={isLoading}
//               className="text-sm text-purple-600 hover:text-purple-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
//             >
//               Forgot password?
//             </button>
//           </div>

//           <button
//             onClick={handleSubmit}
//             disabled={isLoading}
//             className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
//           >
//             {isLoading ? (
//               <>
//                 <AiOutlineLoading3Quarters className="animate-spin mr-2 h-5 w-5" />
//                 Signing In...
//               </>
//             ) : (
//               "Sign In"
//             )}
//           </button>

//           <p className="text-center text-sm text-gray-600 mt-6">
//             Don't have an account?{" "}
//             <button
//               type="button"
//               disabled={isLoading}
//               className="text-purple-600 hover:text-purple-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
//             >
//               Contact Admin
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdError, MdLightbulb } from "react-icons/md";
import { authService } from "../services/authServices";

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (): Promise<void> => {
    setError(null);

    // Basic validation
    if (!form.username || !form.password) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);

    try {
      const data = await authService.login({
        username: form.username,
        password: form.password,
      });

      // Store tokens and user info
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userId", data.id.toString());
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);

      // Redirect to dashboard
      window.location.href = "/financedashboard";
    } catch (err: any) {
      // err is already formatted by handleError() in service
      setError(err.message || "An unexpected error occurred");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4">
            <MdLightbulb className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">GMS AI Assistant</h1>
          <p className="text-purple-100 text-sm">
            Get Smart Recommendations For Your Grant Application
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Sign in to continue to your dashboard
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
              <p className="text-sm text-red-600 flex items-center">
                <MdError className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </p>
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin mr-2 h-5 w-5" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
