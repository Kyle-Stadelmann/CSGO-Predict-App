import "./App.css"

import Header from "./components/Header"
import Button from "./components/Button"
import TextInput from "./components/TextInput"

function App() {
	document.title = "CSGO Predictions™"

	return (
		<div className="App">
			<Header title="CSGO Pickems" textColor="blue" />
			<TextInput label="username " />
			<TextInput label="password " />
			<Button text="GO!!!!!" color="#00BFFF" />
		</div>
	)
}

export default App;
