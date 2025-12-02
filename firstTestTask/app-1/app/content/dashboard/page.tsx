"use client";
import ListOfTask from "@/component/ListOfTasks/ListOfTask";
import { returnToDayData } from "@/utils/unils";

const Page = () => {
	return (
		<div className="p-5">
			<div className="md:p-10 text-center md:text-left">
				<h1 className="text-xl pb-3 md:text-4xl md:p-5 font-bold text-black">
					My Tasks
				</h1>
				<div className="mb-8 text-xs md:text-xl">{returnToDayData()}</div>
			</div>

			<div className="p-15">
				<ListOfTask />
			</div>
		</div>
	);
};

export default Page;
