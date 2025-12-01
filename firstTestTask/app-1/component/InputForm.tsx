import React from "react";
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
			type={type}
			{...register(type)}
			placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
			className="w-full px-4 py-3 border  rounded-md transition-all duration-200 text-black"
		/>
	);
};

export default InputForm;
