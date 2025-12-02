import { fetchData } from "@/utils/unils";
import React, { useEffect, useState } from "react";
import CardOfTask from "../CardOfTask/CardOfTask";
import EmptyElementOfList from "../EmptyElementOfList/EmptyElementOfList";

type PriorityItem = {
	status: string;
	count: number;
};

export type Assignee = {
	id: string;
	name: string;
	avatar: string;
};

export type Task = {
	id: string;
	title: string;
	description: string;
	status: "to-do" | "in-progress" | "review" | "completed";
	createdAt: string;
	updatedAt: string;
	dueDate: string;
	assignees?: Assignee[];
};

export type Tasks = Task[];

export type GroupedTasks = {
	priority: Task["status"];
	items: Task[];
};

export type GroupedTasksArray = GroupedTasks[];
export default function ListOfTask() {
	const [elements, setElements] = useState<Tasks>([]);
	const [priority, setPriority] = useState<PriorityItem[]>([
		{ status: "to-do", count: 0 },
		{ status: "in-progress", count: 0 },
		{ status: "review", count: 0 },
		{ status: "completed", count: 0 },
	]);

	useEffect(() => {
		(async () => {
			const data = await fetchData();
			console.log(data);
			setPriority((prev) => {
				return prev.map((p) => {
					const count = data.filter(
						(task: Task) => task.status === p.status
					).length;
					return { ...p, count };
				});
			});
			setElements(data);
		})();
	}, []);
	return (
		<div className="flex justify-between gap-4 flex-col md:flex-row">
			{priority.map((el, key) => {
				const tasksForStatus = elements.filter(
					(task) => task.status === el.status
				);
				const maxSlots = 3;
				const emptySlotsCount = Math.max(0, maxSlots - tasksForStatus.length);

				return (
					<div key={key} className="flex flex-col flex-1 ">
						<h2 className="text-lg font-semibold mb-4 capitalize">
							{el.status.replace("-", " ")} ({el.count})
						</h2>
						<div className="flex flex-col gap-3 ">
							{tasksForStatus.map((task) => {
								return <CardOfTask key={task.id} task={task} />;
							})}
							{Array.from({ length: emptySlotsCount }).map((_, index) => (
								<EmptyElementOfList key={`empty-${index}`} />
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
}
