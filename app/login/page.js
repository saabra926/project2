"use client";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
    const [show, setShow] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset, } = useForm();

    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/api/auth/login", data)
            reset();
            toast.success("login successfull")
            setTimeout(() => {
                router.push("/dashboard");
            }, 1500);
        } catch (err) {
            const message = err.response?.data?.message || "Invalid email or password"
            toast.error(message)
            console.log(err)
        }
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* emial kaliya */}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            },
                        })}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>

                {/* password kaliya */}
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        className="form-control"
                        type={show ? "text" : "password"}
                        {...register("password", {
                            required: "Password is required",
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                message: "Password must be atleast 6 and includes symbols characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="text-danger">{errors.password.message}</p>
                    )}

                    <label className="mt-3">
                        <input checked={show} onChange={() => setShow(!show)} type="checkbox" />Show Password
                    </label>

                </div>



                <button type="submit" className="btn btn-primary">
                    LogIn
                </button>
                <div className="mt-3 d-flex justify-content-between">
                    <p className="mb-0">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-primary fw-bold">
                            Register
                        </Link>
                    </p>
                    <p className="mb-0">
                        <Link href="#" className="text-primary fw-bold">
                            Forget Password?
                        </Link>
                    </p>
                </div>

            </form>
        </div>
    );
}
