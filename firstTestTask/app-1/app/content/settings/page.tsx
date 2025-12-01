import RightSideBar from "@/component/RightSideBar.tsx/RightSideBar";
import UpdateUserData from "@/component/UpdateUserData/UpdateUserData";

import React from "react";

const page = () => {
	return (
		<div className="h-screen flex">
			<UpdateUserData />
			<RightSideBar />
		</div>
	);
};

export default page;
