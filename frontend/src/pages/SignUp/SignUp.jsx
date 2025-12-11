import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { saveAndUpdateUser } from "../../Utility";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [role, setRole] = useState("Student");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, phone } = data;

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, "");
      await saveAndUpdateUser({
        name,
        email,
        phone,
        uid: result.user.uid,
        role: "Student", // default role
        image: "",
      });

      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || err?.message || "Signup Failed"
      );
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      await saveAndUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        uid: user.uid,
        phone: "",
        role: "Student", // default role
      });
      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Google SignIn Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col max-w-md w-full p-6 sm:p-10 rounded-lg shadow-lg bg-white text-gray-900">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-gray-500 mt-1">Create your account to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm mb-1 font-medium">
              Name
            </label>
            <input
              id="name"
              placeholder="Enter Your Name"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-lime-500 bg-gray-100"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-lime-500 bg-gray-100"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm mb-1 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-lime-500 bg-gray-100"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "Password must include uppercase, lowercase, number & special character",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm mb-1 font-medium">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-lime-500 bg-gray-100"
            >
              <option value="Student">Student</option>
              <option value="Tutor">Tutor</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm mb-1 font-medium">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter Phone Number"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-lime-500 bg-gray-100"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-lime-500 text-white font-semibold rounded-md hover:bg-lime-600 transition-colors flex justify-center items-center"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin" size={24} />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Social Login */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-gray-500 text-sm">Or continue with</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-lime-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
