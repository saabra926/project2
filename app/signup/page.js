"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
    const [show, setShow] = useState(false)
    const { register, handleSubmit, watch, formState: { errors }, reset, } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/api/auth/signup", data)
            toast.success("Signup successful!");
            reset();
            setTimeout(() => {
                router.push("/login")
            }, 1500);
        } catch (err) {
            const message = err.response?.data?.message || "User already exist";
            toast.error(message)
            console.log(err)
        }
    };

    const password = watch("password");

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h2 className="mb-3">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                {/* name kaliya */}
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        className="form-control"
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>

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

                    {/* confirm password kaliya */}
                    <label className="form-label mt-3">Confirm Password</label>
                    <input
                        className="form-control"
                        type={show ? "text" : "password"}
                        {...register("confirmpassword", {
                            required: "Password is required",
                            validate: (value) =>
                                value === password || "Password do not match",

                        })}
                    />
                    {errors.confirmpassword && (
                        <p className="text-danger">{errors.confirmpassword.message}</p>
                    )}

                    <label className="mt-3">
                        <input checked={show} onChange={() => setShow(!show)} type="checkbox" />Show Password
                    </label>
                </div>

                <button type="submit" className="btn btn-primary">
                    SignUp
                </button>
            </form>
        </div>
    );
}
