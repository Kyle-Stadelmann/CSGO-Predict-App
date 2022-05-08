import "./App.css"

import Header from "./components/Header"
import Button from "./components/Button"
import TextInput from "./components/TextInput"
import Leaderboard from "./components/Leaderboard"
import Voting from "./components/Voting"

// login screen
/* function App() {
	document.title = "CSGO Predictions™"

	return (
		<div className="App">
			<Header title="CSGO Pickems" textColor="blue" />
			<TextInput label="username " />
			<TextInput label="password " />
			<Button text="GO!!!!!" color="#00BFFF" />
		</div>
	)
} */

// move this to a separate Management component file when
// login screen is implemented
function App() {
	document.title = "CSGO Predictions™"

	return (
		<div className="App">
			<Header title="Management Screen" textColor="red" />
			{/* leaderboard and voting components go here */}
			<Leaderboard title="Select your Donnybrook" />
			<Voting title="Select a Stage" />
		</div>
	)
}

export default App;
