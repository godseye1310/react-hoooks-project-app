import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	//useEffect Hook is Used to handle side effects in React || side Effects RUNS ONLY Once since Dependencies Array is Empty i.e. when the component is rendered first//
	useEffect(() => {
		const storedUserLoggedInStatus = localStorage.getItem("isLoggedIn");
		if (storedUserLoggedInStatus === "1") {
			setIsLoggedIn(true);
		}
	}, []);

	const loginHandler = (email, password) => {
		// We should of course check email and password
		// But it's just a dummy/ demo anyways
		setIsLoggedIn(true);
		localStorage.setItem("isLoggedIn", "1");
	};

	const logoutHandler = () => {
		setIsLoggedIn(false);
		localStorage.removeItem("isLoggedIn");
	};

	return (
		<React.Fragment>
			<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
			<main>
				{!isLoggedIn && <Login onLogin={loginHandler} />}
				{isLoggedIn && <Home onLogout={logoutHandler} />}
			</main>
		</React.Fragment>
	);
}

export default App;
