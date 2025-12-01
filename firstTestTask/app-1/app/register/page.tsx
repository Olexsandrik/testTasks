"use client";
import InputForm from "@/component/InputForm";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { toast } from "react-toastify";

export type FormData = {
	name: string;
	email: string;
	password: string;
};

const Page = () => {
	const { register, handleSubmit, reset } = useForm<{
		name?: string;
		email?: string;
		password?: string;
	}>();

	const onSubmit = (data: {
		name?: string;
		email?: string;
		password?: string;
	}) => {
		if (!data) return;
		const checkStorage = localStorage.getItem("users");
		if (!checkStorage) {
			localStorage.setItem("users", JSON.stringify([data as FormData]));
		}
		if (checkStorage) {
			const users = JSON.parse(checkStorage);
			const user = users.find((user: FormData) => user.email === data.email);
			if (user) {
				toast.error("User already exists");
			} else {
				localStorage.setItem("users", JSON.stringify([...users, data]));
				toast.success("User registered successfully");
			}
		}
		reset();
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-md">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6"
				>
					<div className="space-y-4">
						<InputForm register={register} type="name" />
						<InputForm register={register} type="email" />
						<InputForm register={register} type="password" />
					</div>

					<button
						type="submit"
						className="w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer"
					>
						Register
					</button>
					<Link
						href="/login"
						className="block text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
					>
						Already have an account? Login
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Page;
