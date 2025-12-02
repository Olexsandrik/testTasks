import SideBar from "@/component/SideBar/SideBar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen bg-gray-100">
			<aside className="w-[300px] md:w-[350px] h-screen sticky top-0 hidden md:block">
				<SideBar />
			</aside>
			<main className="flex-1 min-h-screen">{children}</main>
		</div>
	);
}
