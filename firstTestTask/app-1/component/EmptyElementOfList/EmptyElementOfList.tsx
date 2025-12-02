import React from "react";

export default function EmptyElementOfList() {
	return (
		<div className="min-w-[160] min-h-[180] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 mb-3">
			<div className="text-gray-400 text-sm">Empty slot</div>
		</div>
	);
}
