import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import FoodBar from './components/FoodBar.jsx'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<Header />
			<FoodBar />
			<img url="./assets/Icons/icons8-cake-50.png" />
		</>
	)
}

export default App
