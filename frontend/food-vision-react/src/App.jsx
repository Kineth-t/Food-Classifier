import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import FoodBar from './components/FoodBar.jsx'
import ImgInput from './components/ImgInput.jsx'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<Header />
			<FoodBar />
			<ImgInput />
		</>
	)
}

export default App
