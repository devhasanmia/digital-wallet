import { Mail, Lock, Phone } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import LabeledInput from "../components/ui/InputWithLabel";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Link } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";


const loginSchema = z.object({
  phone: z
    .string({ error: 'Phone is required' })
    .min(1, { error: 'Phone is required' })
    .regex(/^01\d{9}$/, { error: 'Phone number must be 11 digits and start with 01' }),
  password: z.string({ error: 'Password is required' })
    .min(6, { error: 'Password must be at least 6 characters long' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await login(data).unwrap();
      toast.success(res?.message || "Login successful!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  const fillDemoCredentials = (type: "user" | "agent" | "admin") => {
    if (type === "user") {
      setValue("phone", "user@example.com");
      setValue("password", "user1234");
    } else if (type === "agent") {
      setValue("phone", "agent@example.com");
      setValue("password", "agent1234");
    } else if (type === "admin") {
      setValue("phone", "admin@example.com");
      setValue("password", "admin1234");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            Secure Login
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Access your account safely
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <LabeledInput
            label="Phone"
            name="phone"
            type="phone"
            placeholder="Enter your Phone"
            icon={<Phone />}
            register={register}
            error={errors.phone?.message}
          />

          <LabeledInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your Password"
            icon={<Lock />}
            register={register}
            error={errors.password?.message}
          />

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <PrimaryButton type="submit" icon={<Lock />}>
            Login
          </PrimaryButton>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Try our demo accounts for quick access
          </p>

          {/* Demo buttons */}
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => fillDemoCredentials("user")}
              className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition"
            >
              Demo User
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials("agent")}
              className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition"
            >
              Demo Agent
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials("admin")}
              className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-800 text-white text-sm rounded-lg transition"
            >
              Demo Admin
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
