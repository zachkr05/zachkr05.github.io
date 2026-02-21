import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


export function Navbar() {
	return (

		<nav className="navbar">
			<div className="navbar-logo">my site</div>
			<ul className = "navbar-links"> 
				<li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
			</ul>
		</nav>

	);
}

function App() {

  return (
    <>
			<Navbar />
    </>
  )
}

export default App
