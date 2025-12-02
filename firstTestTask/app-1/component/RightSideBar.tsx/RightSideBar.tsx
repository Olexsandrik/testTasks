"use client";
import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";

const RightSideBar = () => {
	const { setUser } = useAuth();
	const router = useRouter();

	const handleLogout = () => {
		setUser(null);
		router.push("/login");
	};

	const profileProgress = 75;

	return (
		<div className="bg-gray-50 hidden md:block md:w-[700px]">
			<div className="flex flex-col p-6">
				<div className="mb-6">
					<h1 className="text-2xl font-bold text-gray-800 mb-2">My Profile</h1>
					<p className="text-sm text-green-500 font-medium">
						{profileProgress}% completed your profile
					</p>
				</div>

				<div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-200">
					<div className="relative w-32 h-32 mb-4">
						<svg className="w-32 h-32 transform -rotate-90">
							<circle
								cx="64"
								cy="64"
								r="56"
								fill="none"
								stroke="#E5E7EB"
								strokeWidth="8"
							/>
						</svg>
					</div>

					<p className="text-sm text-gray-500">Developer at White Digital</p>
				</div>

				<div className="mt-auto">
					<button
						onClick={handleLogout}
						className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default RightSideBar;
