import React, { useEffect, useState } from "react";

//React Context & useContext Hook is used to Pass information from one component to another components without props chaining//

//just default object is provided //
const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {},
});

//Making use of central custom context provider component//
//Standard Industry Practice to simplify and optimize//
export const AuthContextProvider = (props) => {
	//Authoriztion logic//
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
			value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
