import { motion } from "framer-motion";

export default function SecondSection() {
	return (
		<div className="py-16 px-4 bg-white flex flex-col items-center">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-[48px] font-['Inter'] font-extrabold text-[#09090A]  mb-12"
			>
				Trusted by <span className="text-[#005CE2]">7,046,382</span> users from
				20 countries
			</motion.h2>

			<div className="flex items-center justify-center gap-[50px]">
				<motion.img
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					src="/secondSection/secondImg.svg"
					alt="icon_2"
				/>

				<div>
					<motion.div
						className=" bg-[#FFFFFF] text-center rounded-[10px] w-[340px] h-[110px] p-[10px] text-center m-auto"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<motion.div className="flex items-center justify-between gap-2">
							<motion.img
								src="/secondSection/SecondSectionLogo.svg"
								alt="logo_section_2"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
							/>
							<motion.p
								className="text-[16px] font-['Regular']  font-400 text-[#4D4F53]"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
							>
								Now
							</motion.p>
						</motion.div>

						<motion.p
							className="text-[16px] font-['Inter'] font-400 text-[#4D4F53] whitespace-pre-line"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
						>
							<span className="text-gray-500">You received</span> 6.80 USDT{" "}
							<span className="text-gray-500">from</span> Staking Daily
						</motion.p>
					</motion.div>

					<motion.div
						className="relative"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<motion.img
							src="/secondSection/laptop.svg"
							alt="icon_1"
							className="w-[600px] h-[370px] absolute top-[150px] left-50]"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
						/>{" "}
					</motion.div>
					<div className="w-[538px] h-[272px] bg-[#0061F8] border border-[#0061F8] rounded-[25px]  mt-[200px]"></div>
				</div>

				<motion.img
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					src="/secondSection/thirdImg.svg"
					alt="icon_2"
				/>
			</div>
		</div>
	);
}
