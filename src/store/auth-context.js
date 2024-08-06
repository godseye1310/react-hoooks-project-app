import React from "react";

//React Context & useContext Hook is used to Pass information from one component to another components without props chaining//

//just default object is provided //
const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogOut: () => {},
});

export default AuthContext;
