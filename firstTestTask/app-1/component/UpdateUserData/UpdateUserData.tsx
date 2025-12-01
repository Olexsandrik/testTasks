"use client";
import { useAuth, User } from "@/app/providers/AuthProvider";
import { useForm } from "react-hook-form";
import InputForm from "../InputForm";
import { toast } from "react-toastify";

export default function UpdateUserData() {
	const { user, setUser } = useAuth();

	const { register, handleSubmit, reset } = useForm<{
		name?: string;
		password?: string;
	}>();

	const returnToDayData = () => {
		const today = new Date();
		const dayOfWeekIndex = today.getDay();
		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		const dayOfWeek = days[dayOfWeekIndex];
		const date = today.toISOString().split("T")[0];

		return (
			<p className="text-2xl">
				<span className="text-green-700">{dayOfWeek}</span>, {date}
			</p>
		);
	};

	const onSubmit = (data: { name?: string; password?: string }) => {
		if (!user?.email) {
			toast.error("User not found");
			return;
		}

		const newData: User = {
			name: data.name,
			password: data.password,
			email: user.email,
		};

		const reciveData = localStorage.getItem("users");
		const users: User[] = reciveData ? JSON.parse(reciveData) : [];

		const updatedUsers = users.map((userData: User) =>
			userData.email === user.email ? newData : userData
		);

		if (updatedUsers) {
			localStorage.setItem("users", JSON.stringify(updatedUsers));

			setUser(newData);

			toast.success("Profile updated");
		}
		reset();
	};

	return (
		<div className="flex-1 min-w-[75%] p-7">
			<div className="mb-8">
				<h1 className="text-4xl pb-3 font-bold text-black">Setting</h1>
				{returnToDayData()}
			</div>

			<div className="mt-8">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-800">
							Name
						</label>
						<InputForm register={register} type="name" />
					</div>

					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-800">
							Password
						</label>
						<InputForm register={register} type="password" />
						<p className="text-sm text-gray-700 underlin">
							Your password is between 4 and 12 characters
						</p>
					</div>

					<div className="flex justify-end mt-8">
						<button
							type="submit"
							className="bg-[#64C882] hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg w-100"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
