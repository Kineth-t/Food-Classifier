import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import FoodBar from './components/FoodBar.jsx'
import ImgInput from './components/ImgInput.jsx'

function App() {
	const [uploaded, setUploaded] = useState(false)

	return (
		<>
			<Header />
			<FoodBar />
			<h2>This is a food classification model built with TensorFlow.</h2>
			<h2>The uploaded image will be classified into one of the 101 classes of foods in this model</h2>
			<h2><b>Note:</b>This model has an accuracy of xx.x% and its just meant to be a fun project that I made</h2>
			<ImgInput />
		</>
	)
}

export default App
