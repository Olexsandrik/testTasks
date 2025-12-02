import { UseFormRegister } from "react-hook-form";

const InputForm = ({
	register,
	type,
	classNameProps,
}: {
	register: UseFormRegister<{
		email?: string;
		password?: string;
		name?: string;
	}>;
	type: "email" | "password" | "name";
	classNameProps?: string;
}) => {
	const validationForPassword =
		type === "password"
			? {
					required: "Your password is between 4 and 12 characters",
					minLength: {
						value: 4,
						message: "Your password is between 4 and 12 characters",
					},
					maxLength: {
						value: 12,
						message: "Your password is between 4 and 12 characters",
					},
				}
			: {};

	return (
		<input
			type={type === "name" ? "text" : type}
			{...register(type, validationForPassword)}
			placeholder={
				type === "password"
					? "Enter password"
					: type.charAt(0).toUpperCase() + type.slice(1)
			}
			className={
				classNameProps
					? classNameProps
					: "w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:border-dashed transition-all duration-200 text-black bg-white"
			}
		/>
	);
};

export default InputForm;
