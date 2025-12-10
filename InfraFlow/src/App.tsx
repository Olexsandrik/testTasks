import "./App.css";
import AnalyticsInfo from "./components/AnalyticsInfo";
import FirstSection from "./components/FirstSection";
import Header from "./components/Header";
import SecondSection from "./components/SecondSection";
import Footer from "./components/Footer";
import AnalyticsStats from "./components/AnalyticsStats";

function App() {
	return (
		<>
			<div className="w-full">
				<Header />

				<div className="pt-[80px]">
					<FirstSection />
				</div>

				<SecondSection />

				<AnalyticsInfo />
				<AnalyticsStats />
			</div>
		</>
	);
}

export default App;
