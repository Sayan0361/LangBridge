import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";
// import { login } from "../lib/api";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // const queryClient = useQueryClient();
  // const {mutate:loginMutation,isPending, error} = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"]}),
  // });

  const {isPending,error,loginMutation} = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  }
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Login Form Section */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="rounded-2xl bg-zinc-950 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                  <img 
                    src="/logo.png" 
                    alt="LangBridge Logo"
                    className="h-8 rounded-full w-auto object-contain transition-transform duration-300"
                  />
                </div>
                <span className="text-3xl font-bold font-mono italic bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  LangBridge
                </span>
              </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error?.response?.data?.message || error.message || "Something went wrong"}</span>
            </div>
          )}

          <div className="w-full">
            {/* Form */}
            <form onSubmit={handleLogin}>
              {/* Heading */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Welcome Back
                  </h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to continue your language journey
                  </p>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-3">
                    <div className="form-control w-full space-y-2">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder="sayan@example.com"
                        className="input input-bordered w-full"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>

                {/* Password */}
                <div className="form-control w-full space-y-2">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="********"
                    className="input input-bordered w-full"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>

                {/* Button */}
                <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                {/* Don't have an account? */}
                <div className="text-center mt-4">
                  <p className="text-sm">
                    Don't have an account? {" "}
                    <Link to="/signup" className="text-primary hover:underline">
                      Create one
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* IMAGE SECTION */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
        <div className="max-w-md p-8">
          {/* Illustration */}
          <div className="relative aspect-square max-w-sm mx-auto">
            <img src="/i.png" alt="Language connection illustration" className="w-full h-full" />
          </div>

          <div className="text-center space-y-3 mt-6">
            <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
            <p className="opacity-70 italic">
              Practice conversations, make friends, and improve your language skills together
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

export default LoginPage