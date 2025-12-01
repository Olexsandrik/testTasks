import React from "react";
import Image from "next/image";
import { Task } from "../ListOfTasks/ListOfTask";

interface CardOfTaskProps {
	task: Task;
}

const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.toLocaleString("en-US", { month: "long" });
	return `${day} ${month}`;
};

export default function CardOfTask({ task }: CardOfTaskProps) {
	return (
		<div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-3 min-w-[200px] min-h-[200px]">
			<h3 className="font-semibold text-gray-900 mb-2 text-base">
				{task.title}
			</h3>

			<p className="text-sm text-gray-600 mb-4 line-clamp-3">
				{task.description}
			</p>

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
					<svg
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<polyline points="12 6 12 12 16 14"></polyline>
					</svg>
					<span>{formatDate(task.dueDate)}</span>
				</div>

				{task.assignees && task.assignees.length > 0 && (
					<div className="flex -space-x-2">
						{task.assignees.slice(0, 3).map((assignee) => (
							<div
								key={assignee.id}
								className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200 relative"
							>
								<Image
									src={assignee.avatar}
									alt={assignee.name}
									fill
									className="object-cover"
									unoptimized
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
