import { motion } from "framer-motion";
export default function Header() {
	return (
		<motion.header
			initial={{ opacity: 0 }}
			animate={{ opacity: 0.9 }}
			transition={{ duration: 0.5 }}
			className="fixed top-0 left-0 w-full bg-[#FFFFFF] text-white  flex justify-between items-center"
		>
			<div className="flex items-center gap-4 px-10 py-1 w-full p-[20px] pb-[10px]">
				<div className="flex items-center">
					<img src="/public/header_logo.png" alt="Logo" className="h-8 mr-4" />
				</div>
				<nav className="max-w-[600px] w-full">
					<ul className="flex justify-around items-center gap-4 text-sm w-full md:w-auto">
						<li className="text-black font-[Neutral/500]">
							<a href="#" className="hover:text-gray-300 text-[#09090A]">
								Statistic
							</a>
						</li>
						<li className="font-[Neutral/500]">
							<a href="#" className="hover:text-gray-300 text-[#09090A]">
								Asset
							</a>
						</li>
						<li className="font-[Neutral/500]">
							<a href="#" className="hover:text-gray-300 text-[#09090A]">
								Features
							</a>
						</li>
						<li className="font-[Neutral/500]">
							<a href="#" className="hover:text-gray-300 text-[#09090A]">
								Benefits
							</a>
						</li>
						<li className="font-[Neutral/500]">
							<a href="#" className="hover:text-gray-300 text-[#09090A]">
								FAQ
							</a>
						</li>
					</ul>
				</nav>
			</div>

			<div className="relative">
				<select className="bg-transparent border border-gray-300 rounded px-3 py-1 text-black font-[Neutral/500] cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
					<option value="en">EN</option>
					<option value="ua">UA</option>
				</select>
			</div>
		</motion.header>
	);
}
