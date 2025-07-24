import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import FoodBar from './components/FoodBar.jsx'
import ImgInput from './components/ImgInput.jsx'
import Result from './components/Result.jsx'

function App() {
	const [uploaded, setUploaded] = useState(false)

	return (
		<>
			<Header />
			<FoodBar />
			<div className="introContainer">	
				<h3>This is a food classification model build with TensorFlow.</h3>
				<h3>The uploaded image will be classified into one of the 101 classes of foods in this model.</h3>
				<h3><b>Note:</b> This model has an accuracy of xx.x% and its just meant to be a fun project that I made</h3>
			</div>
			<ImgInput />
			<Result />
		</>
	)
}

export default App
