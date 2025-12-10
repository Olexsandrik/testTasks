import "./App.css";
import FirstSection from "./components/FirstSection";
import Header from "./components/Header";
import SecondSection from "./components/SecondSection";

function App() {
	return (
		<>
			<div className="w-full">
				<Header />

				<div className="pt-[80px]">
					<FirstSection />
				</div>

				<SecondSection />
			</div>
		</>
	);
}

export default App;
