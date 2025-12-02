"use client";
import { useAuth, User } from "@/app/providers/AuthProvider";
import { useForm } from "react-hook-form";
import InputForm from "../InputForm";
import { toast } from "react-toastify";
import { returnToDayData } from "@/utils/unils";

export default function UpdateUserData() {
	const { user, setUser } = useAuth();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<{
		name?: string;
		password?: string;
	}>();

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
		<div className="flex-1 w-full p-4 md:p-7">
			<div className="mb-6 md:mb-8">
				<h1 className="text-3xl md:text-4xl pb-3 font-bold text-black">
					Setting
				</h1>
				{returnToDayData()}
			</div>

			<div className="mt-6 md:mt-8">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-4 md:space-y-6"
				>
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-800">
							Name
						</label>
						<InputForm register={register} type="name" classNameProps={""} />
					</div>

					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-800">
							Password
						</label>
						<InputForm
							register={register}
							type="password"
							classNameProps={""}
						/>
						{errors.password && (
							<p className="text-sm text-red-500">{errors.password.message}</p>
						)}
					</div>

					<div className="flex justify-end mt-6 md:mt-8">
						<button
							type="submit"
							className="bg-[#64C882] hover:bg-green-600 text-white font-bold py-3 px-6 md:px-8 rounded-lg w-full md:w-auto"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
