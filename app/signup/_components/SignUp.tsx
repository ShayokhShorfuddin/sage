"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import {
  type FieldErrors,
  type UseFormRegister,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { GoogleAuthAction, RegisterUserAction } from "@/app/actions/user";
import Google from "@/public/images/google.svg";
import Icon from "@/public/images/icon.png";

const signUpSchema = z
  .object({
    name: z
      .string()
      .max(50, { message: "Name cannot be longer than 50 characters." })
      .nonempty({ message: "Please enter your name." }),
    email: z
      .email({ message: "Please enter a valid email address." })
      .max(40, { message: "Email cannot be longer than 40 characters." })
      .nonempty({ message: "Please enter your email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .max(30, { message: "Password cannot be longer than 30 characters." })
      .nonempty({ message: "Please enter a password." })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Ensure at least one uppercase letter, one lowercase letter, and a number in your password.",
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "Please confirm your password." })
      .max(30, {
        message: "Confirmation password cannot be longer than 30 characters.",
      })
      .nonempty({ message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match. Please try again.",
    path: ["confirmPassword"],
  });

type SignUpFormFields = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormFields>({
    resolver: zodResolver(signUpSchema),
  });

  // Form submission state for button disabling
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onCredentialSubmitLogic(formData: SignUpFormFields) {
    setIsSubmitting(true);

    const { name, email, password } = formData;
    const result = await RegisterUserAction({ name, email, password });

    // At least for now, the only reason for a failure is when the user already exists
    if (!result.success) {
      setError("email", { message: result.message });
      setIsSubmitting(false);
      return;
    }

    // Registration was successful. Let's log the user in
    redirect("/home");
    // TODO: Instead of /home, redirect to email verification page and after being verified, redirect to /home
  }

  return (
    <section className="flex flex-col items-center justify-center h-svh">
      <div className="flex flex-col items-center max-w-64">
        <Image src={Icon} alt="icon" className="size-11" />

        <p className="text-2xl text-neutral-300 font-medium mt-1">
          Create a new account
        </p>

        <form action={GoogleAuthAction} className="w-full">
          <button
            type="submit"
            className="flex gap-x-3 justify-center items-center text-nowrap w-full bg-neutral-200 text-neutral-800 font-medium mt-6 py-2 rounded-sm hover:cursor-pointer select-none"
          >
            <Image src={Google} alt="icon" className="size-5" />
            <span className="text-sm">Continue with Google</span>
          </button>
        </form>

        <div className="flex items-center gap-x-3 w-full mt-2">
          <div className="h-[0.5px] w-full bg-neutral-800" />
          <p className="text-neutral-500 text-sm text-nowrap">or use email</p>
          <div className="h-[0.5px] w-full bg-neutral-800" />
        </div>

        <form
          className="flex flex-col w-full gap-y-2 mt-2 text-sm"
          onSubmit={handleSubmit(onCredentialSubmitLogic)}
        >
          <input
            {...register("name")}
            type="text"
            name="name"
            placeholder="John Doe"
            className="px-4 py-2 rounded-lg border border-neutral-600 bg-neutral-800 text-neutral-200 placeholder-neutral-500"
          />

          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            {...register("email")}
            type="text"
            name="email"
            placeholder="john@example.com"
            className="px-4 py-2 rounded-lg border border-neutral-600 bg-neutral-800 text-neutral-200 placeholder-neutral-500"
          />

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <PasswordField errors={errors} register={register} />

          <input
            {...register("confirmPassword")}
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="px-4 py-2 rounded-lg border border-neutral-600 bg-neutral-800 text-neutral-200 placeholder-neutral-500 w-full"
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-3 py-2 hover:cursor-pointer bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm text-neutral-200 font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:bg-neutral-900"
          >
            {isSubmitting ? "Hashing..." : "Sign up"}
          </button>
        </form>

        <p className="text-neutral-500 text-sm text-nowrap mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-neutral-300 underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

function PasswordField({
  errors,
  register,
}: {
  errors: FieldErrors<SignUpFormFields>;
  register: UseFormRegister<SignUpFormFields>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="w-full flex">
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          className="px-4 py-2 rounded-l-lg border border-neutral-600 bg-neutral-800 text-neutral-200 placeholder-neutral-500 w-full"
        />

        <button
          type="button"
          className="p-2 border border-l-0 border-neutral-600 bg-neutral-800 rounded-r-lg hover:cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff size={16} className="text-neutral-300" />
          ) : (
            <Eye size={16} className="text-neutral-300" />
          )}

          {showPassword ? (
            <span className="sr-only">Hide password</span>
          ) : (
            <span className="sr-only">Show password</span>
          )}
        </button>
      </div>

      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}
    </>
  );
}
