import { motion } from "framer-motion";

export default function SecondSection() {
	return (
		<div className="py-16 px-4 bg-white flex flex-col items-center">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-[48px] font-['Inter'] font-extrabold text-[#09090A] leading-tight mb-12"
			>
				Trusted by <span className="text-[#005CE2]">7,046,382</span> users from
				20 countries
			</motion.h2>

			<div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					className="flex flex-col items-center gap-4"
				>
					<div className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-gray-50 p-4">
						<div className="aspect-[4/5] bg-gray-200 rounded-xl mb-4 relative overflow-hidden">
							<div className="absolute inset-0 flex items-center justify-center text-gray-400">
								Person using phone
							</div>
						</div>
						{/* Graph Card */}
						<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
							<div className="h-16 w-full flex items-center justify-center">
								<svg
									viewBox="0 0 100 30"
									className="w-full h-full stroke-blue-500 fill-none stroke-2"
								>
									<path d="M0,25 C10,25 15,10 25,15 C35,20 40,25 50,10 C60,-5 70,20 80,15 C90,10 95,5 100,20" />
								</svg>
							</div>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="flex flex-col items-center relative"
				>
					{/* Notification Pop-up */}
					<div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 mb-6 w-full max-w-sm relative z-10 transform -rotate-1">
						<div className="flex justify-between items-start mb-2">
							<div className="flex items-center gap-2">
								<span className="font-bold text-blue-600">onus</span>
							</div>
							<span className="text-xs text-gray-400">now</span>
						</div>
						<p className="text-sm text-gray-600">
							You received{" "}
							<span className="font-bold text-black">6.80 USDT</span> from
							Staking Daily
						</p>
					</div>

					<div className="w-full relative">
						<div className="aspect-[16/10] bg-gray-900 rounded-t-xl border-4 border-gray-800 border-b-0 shadow-2xl overflow-hidden relative">
							<div className="absolute inset-0 p-4 grid grid-cols-4 gap-2 opacity-50">
								<div className="col-span-3 h-full bg-gray-800/50 rounded"></div>
								<div className="col-span-1 h-full bg-gray-800/50 rounded"></div>
							</div>
						</div>
						<div className="h-3 bg-gray-700 rounded-b-lg shadow-lg w-[110%] -ml-[5%]"></div>
					</div>

					{/* Blue Background Blobs */}
					<div className="absolute -z-10 bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-1/2 bg-blue-500 rounded-[2rem] opacity-10"></div>
				</motion.div>

				{/* Right Card: Person & Crypto Icons */}
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					className="flex flex-col items-center gap-4"
				>
					<div className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-gray-50 p-4">
						<div className="aspect-[4/5] bg-gray-200 rounded-xl mb-4 relative overflow-hidden">
							{/* Placeholder for Person Image */}

							<img
								src="secondSection/firstImg.svg"
								alt="Person"
								className="w-full h-full object-cover"
							/>
							<img
								src="/secondSection/secondImg.svg"
								alt="Person"
								className="w-full h-full object-cover"
							/>
							<img
								src="secondSection/third.svg"
								alt="Person"
								className="w-full h-full object-cover"
							/>
						</div>
						{/* Crypto Icons */}
						<div className="flex justify-center gap-3 p-2">
							<div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-xs">
								B
							</div>
							<div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-xs">
								E
							</div>
							<div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-xs">
								X
							</div>
							<div className="w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center text-white font-bold text-xs">
								S
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
