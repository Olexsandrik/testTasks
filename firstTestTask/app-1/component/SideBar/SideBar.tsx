"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";

const SideBar = () => {
	const pathname = usePathname();
	const { user } = useAuth();

	const isDashboardActive = pathname === "/content/dashboard";
	const isSettingsActive = pathname === "/content/settings";

	return (
		<div className="h-full bg-white border-l-4 border-b-4 border-blue-500 flex flex-col">
			<div className="flex items-center gap-3 p-6 border-b border-gray-200">
				<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
					<span className="text-white font-bold text-lg">C</span>
				</div>
				<p className="text-black font-bold text-lg">TESTAPP</p>
			</div>

			<nav className="flex-1 py-6">
				<Link
					href="/content/dashboard"
					className={`flex items-center gap-3 px-6 py-3 transition-colors ${
						isDashboardActive
							? "text-green-600"
							: "text-gray-400 hover:text-gray-600"
					}`}
				>
					<div
						className={isDashboardActive ? "" : "opacity-60"}
						style={
							isDashboardActive
								? {
										filter:
											"brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)",
									}
								: undefined
						}
					>
						<Image
							src="/dashboard.png"
							alt="dashboard"
							width={20}
							height={20}
						/>
					</div>
					<span
						className={`font-medium ${
							isDashboardActive ? "text-green-600" : "text-gray-400"
						}`}
					>
						Dashboard
					</span>
				</Link>

				<Link
					href="/content/settings"
					className={`flex items-center gap-3 px-6 py-3 transition-colors ${
						isSettingsActive
							? "text-green-600"
							: "text-gray-400 hover:text-gray-600"
					}`}
				>
					<div
						className={isSettingsActive ? "" : "opacity-60"}
						style={
							isSettingsActive
								? {
										filter:
											"brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)",
									}
								: undefined
						}
					>
						<Image src="/Settings.png" alt="settings" width={20} height={20} />
					</div>
					<span
						className={`font-medium ${
							isSettingsActive ? "text-green-600" : "text-gray-400"
						}`}
					>
						Setting
					</span>
				</Link>
			</nav>

			<div className="flex items-center gap-3 p-6 border-t border-gray-200">
				<div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"></div>
				<div className="flex-1">
					<p className="text-black font-medium text-sm">{user?.name}</p>
					<p className="text-gray-500 text-xs">
						{user?.email || "test-mail@email.com"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
