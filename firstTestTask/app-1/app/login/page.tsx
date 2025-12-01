"use client";
import InputForm from "@/component/InputForm";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "../providers/AuthProvider";
export type FormData = {
	email: string;
	password: string;
};
const Page = () => {
	const { register, handleSubmit } = useForm<{
		email?: string;
		password?: string;
	}>();

	const { setUser } = useAuth();

	const onSubmit = (data: { email?: string; password?: string }) => {
		if (!data) return;
		const checkStorage = localStorage.getItem("users");
		if (!checkStorage) {
			toast.error("No users found");
		}

		if (checkStorage) {
			const users = JSON.parse(checkStorage);
			const user = users.find((user: FormData) => user.email === data.email);
			if (user) {
				setUser(user);
				redirect("/content/dashboard");
			} else {
				toast.error("usern not find");
			}
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-md">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6"
				>
					<div className="space-y-4">
						<InputForm register={register} type="email" />
						<InputForm register={register} type="password" />
					</div>

					<button
						type="submit"
						className="w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
					>
						Login
					</button>
					<Link href="/register" className="text-center text-sm text-gray-500">
						Don't have an account? Register
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Page;
