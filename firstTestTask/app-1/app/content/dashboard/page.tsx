"use client";
import ListOfTask from "@/component/ListOfTasks/ListOfTask";
import { returnToDayData } from "@/utils/unils";

const Page = () => {
	return (
		<div className="p-5">
			<h1 className="text-4xl pb-3 font-bold text-black">My Tasks</h1>
			<div className="mb-8">{returnToDayData()}</div>
			<div className="p-15">
				<ListOfTask />
			</div>
		</div>
	);
};

export default Page;
