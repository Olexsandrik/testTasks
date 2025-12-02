import { Tasks } from "@/app/content/dashboard/page";

export const returnToDayData = () => {
	const today = new Date();
	const dayOfWeekIndex = today.getDay();
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	const dayOfWeek = days[dayOfWeekIndex];
	const date = today.toISOString().split("T")[0];

	return (
		<p className="text-2xl">
			<span className="text-green-700">{dayOfWeek}</span>, {date}
		</p>
	);
};
export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.toLocaleString("en-US", { month: "long" });
	return `${day} ${month}`;
};
export const fetchData = async (): Promise<Tasks> => {
	const response = await fetch(
		"https://683857ff2c55e01d184cee44.mockapi.io/api/v1/tasks"
	);
	if (!response.ok) {
		throw new Error("Failed to fetch tasks");
	}

	console.log(response);
	return response.json();
};
