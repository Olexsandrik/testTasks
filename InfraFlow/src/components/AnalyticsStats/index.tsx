export default function AnalyticsStats() {
	const statsInfo = [
		{
			title: "Bitcoin",
			abbreviation: "BTC",
			number: "110,496.6",
			logo: "/AnalyticsStats/Bitcoin.svg",
			procentLogo: "/AnalyticsStats/BitcoinStats.svg",
			procent: "-1.73%",
		},
		{
			title: "USD Coin",
			abbreviation: "USDC",
			number: "1",
			logo: "/AnalyticsStats/USD.svg",
			procentLogo: "/AnalyticsStats/USDStats.svg",
			procent: "+0.03%",
		},
		{
			title: "Ethereum",
			abbreviation: "ETH",
			number: "3,737.41",
			logo: "/AnalyticsStats/Ethereum.svg",
			procentLogo: "/AnalyticsStats/EthereumStats.svg",
			procent: "-2.22%",
		},
		{
			title: "Solana",
			abbreviation: "SOL",
			number: "175.66",
			logo: "/AnalyticsStats/Solana.svg",
			procentLogo: "/AnalyticsStats/SolanaStats.svg",
			procent: "-6.9%",
		},
	];

	const isPositive = (procent: string) => procent.startsWith("+");

	return (
		<div className="max-w-[800px] mx-auto p-6">
    			<div className="grid grid-cols-2 gap-[20px]">
				{statsInfo.map((item) => (
					<div
						key={item.title}
						className="bg-[#FFFFFF] border border-[#D7D8DA] rounded-[10px] p-6 relative p-[20px] text-center"
					>
						<div className="flex items-start justify-between mb-4">
							<h3 className="text-[#09090A] text-base font-medium">
								{item.title} {item.abbreviation}
							</h3>
							<img src={item.logo} alt={item.title} className="w-10 h-10" />
						</div>

						<div className="mb-6">
							<p className="text-[#09090A] text-2xl font-bold">
								{item.number} USD
							</p>
						</div>

						<div className="flex items-center justify-between">
							<p
								className={`text-base font-semibold ${
									isPositive(item.procent) ? "text-green-500" : "text-red-500"
								}`}
							>
								{item.procent}
							</p>
							<img
								src={item.procentLogo}
								alt={`${item.title} stats`}
								className="w-20 h-10"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
