import { React, useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SignIn } from "./SignIn";
import Schedules from "./Schedules";
import Settings from "./Settings";
import Profile from "./Profile";
import TaskPage from "./TaskPage";

function App() {
	const [isUserSignedIn, setIsUserSignedIn] = useState(false);

	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		setIsUserSignedIn(!isUserSignedIn);
	});

	const deviceType = () => {
		const ua = navigator.userAgent;
		if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			return "tablet";
		} else if (
			/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
				ua
			)
		) {
			return "mobile";
		}
		return "desktop";
	};

	if (isUserSignedIn || deviceType() != "desktop") {
		return (
			<BrowserRouter>
				<Routes>
					<Route path="/settings" element={<Settings />} />
					<Route path="/profile" element={<Profile/>}  />
					<Route path="/task/:id" element={<TaskPage />} />
					<Route exact path="/" element={<Schedules />} />
				</Routes>
			</BrowserRouter>
		);
	} else {
		return (
			<BrowserRouter>
				<Routes>
					<Route
						path="/profile"
						element={<Navigate replace to="/" />}
					/>
					<Route exact path="/" element={<SignIn />} />
				</Routes>
			</BrowserRouter>
		);
	}
}

export default App;
