import { UseFormRegister } from "react-hook-form";

const InputForm = ({
	register,
	type,
}: {
	register: UseFormRegister<{
		email?: string;
		password?: string;
		name?: string;
	}>;
	type: "email" | "password" | "name";
}) => {
	return (
		<input
			type={type === "name" ? "text" : type}
			{...register(type)}
			placeholder={
				type === "password"
					? "Enter password"
					: type.charAt(0).toUpperCase() + type.slice(1)
			}
			className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:border-dashed transition-all duration-200 text-black bg-white"
		/>
	);
};

export default InputForm;
