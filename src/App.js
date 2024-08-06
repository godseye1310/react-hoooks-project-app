import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

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
		//we can use the value prop in context.provider to provide the updated values(states)//
		//this updated information will be available in form of context information which then can be accessed in desired component//
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
			}}
		>
			<MainHeader />
			<main>
				{!isLoggedIn && <Login onLogin={loginHandler} />}
				{isLoggedIn && <Home onLogout={logoutHandler} />}
			</main>
		</AuthContext.Provider>
	);
}

export default App;
