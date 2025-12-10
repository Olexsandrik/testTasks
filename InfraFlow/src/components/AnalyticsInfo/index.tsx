import { motion } from "framer-motion";

export default function AnalyticsInfo() {
	const AnalyticsElements = [
		{ number: 600, title: "popular cryptocurrencies and stocks" },
		{ number: "3m", title: "join the Telegram channel" },
		{ number: "1m", title: "join channel X" },
	];
	const dopInfoElements = [
		{
			number: 4.7,
			title: "reviews on the App Store & Google Play",
			img: "/AnalyticsSection/starAnalytics.svg",
		},
		{
			number: "05",
			title: "countries licensed to operate:",
			subtitle: "Czech Republic, Poland, Lithuania, El Salvador, Dubai",
			img: "",
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
	};

	const numberVariants = {
		hidden: { opacity: 0, scale: 0.5 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.6,
			},
		},
	};

	return (
		<motion.div
			className="max-w-[1000px] mx-auto flex flex-col justify-center text-center"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.3 }}
			variants={containerVariants}
		>
			<motion.div
				className="flex items-center justify-around gap-10"
				variants={containerVariants}
			>
				{AnalyticsElements.map((element) => (
					<motion.div
						key={element.title}
						className="flex flex-col items-center h-32 border-r-2 border-[#DEE0E3] last:border-r-0 p-[25px]"
						variants={itemVariants}
						whileHover={{ scale: 1.05 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<motion.h3
							className="text-[#0068FF] text-[48px]"
							variants={numberVariants}
						>
							{element.number}+
						</motion.h3>
						<motion.p
							className="text-[#09090A] text-[18px]"
							variants={itemVariants}
						>
							{element.title}
						</motion.p>
					</motion.div>
				))}
			</motion.div>

			<motion.div
				className="flex items-center justify-around gap-10 mx-auto max-w-[700px]"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				{dopInfoElements.map((element) => (
					<motion.div
						key={element.title}
						className="flex flex-col items-center border-r-2 border-[#DEE0E3] last:border-r-0 p-[25px]"
						variants={itemVariants}
						whileHover={{ scale: 1.05 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<motion.h3
							className="text-[#0068FF] text-[48px] flex items-center justify-center gap-2"
							variants={numberVariants}
						>
							{element.number}
							{element.img && (
								<motion.img
									src={element.img}
									alt={element.title}
									initial={{ rotate: -180, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									transition={{ duration: 0.6, delay: 0.3 }}
								/>
							)}
						</motion.h3>
						<motion.p
							className="text-[#09090A] text-[18px]"
							variants={itemVariants}
						>
							{element.title}
						</motion.p>
						{element.subtitle && (
							<motion.p
								className="text-[#09090A] text-[16px] mt-1"
								variants={itemVariants}
							>
								{element.subtitle}
							</motion.p>
						)}
					</motion.div>
				))}
			</motion.div>
		</motion.div>
	);
}
