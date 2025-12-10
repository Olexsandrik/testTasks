import React from "react";

import { motion } from "framer-motion";

export default function FirstSection() {
	return (
		<div className="w-full min-h-[600px] flex items-center justify-center bg-gradient-to-b from-[#005CE2] to-[#0034A4] p-8 md:p-16 overflow-hidden">
			<div className="max-w-7xl w-full flex  md:flex-row items-center justify-center gap-12">
				<div className="flex-1 text-white z-10 flex flex-col items-center md:items-start text-center md:text-left ">
					<motion.h1
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 20, x: 0 }}
						transition={{ duration: 0.5 }}
						className="text-[64px] md:text-6xl lg:text-7xl font-['Inter'] font-extrabold text-[#FFFFFF] leading-tight mb-[60px]"
					>
						Open Nation <br />
						for Universal <br />
						Success
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 120 }}
						animate={{ opacity: 1, y: 0, x: 50 }}
						transition={{ duration: 0.1, delay: 0.1 }}
						className="text-[20px] md:text-xl font-['Inter'] font-medium text-[#FFFFFF] leading-relaxed w-[700px]"
					>
						Trade Bitcoin, Ethereum, USDT, XRP, ONUS, and 300+ <br /> coins
						easily with Vietnamese Dong on ONUS.
					</motion.p>
				</div>

				<div className="flex-1 relative flex justify-center items-center z-10 w-full">
					<motion.div className="relative">
						<motion.img
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0, x: -150 }}
							transition={{ duration: 0.5 }}
							src="/firstSection/LapTop_firstSection.svg"
							alt="Laptop Presentation"
							className="w-[650px] h-[650px] object-contain"
						/>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
