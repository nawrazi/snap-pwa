import React, {useState} from "react";
import Sidebar from '../components/Sidebar';
import { signOutWithGoogle } from "../components/Firebase";
import RoutineList from "../components/Routine";
import Nav from "../components/Nav";
import '../styles/profile.css';

const custom_css = ` .container { padding: 28px; } `

export default function Profile() {
    const [isOpened, setIsOpened] = useState(false);

    var info = JSON.parse(localStorage.getItem("userInfo"));
    var name = info?.name || "";
    var pic = info?.profilePic || require("../images/default_profile.jpg");

    return (
        <>
            <header>
				<Sidebar
					pageWrapId={"page-wrap"}
					outerContainerId={"outer-container"}
					isOpened={isOpened}
					setIsOpened={setIsOpened}
				/>

				<div className="container">
					<Nav
						title={"Profile"}
						utilities={false}
						isOpened={isOpened}
						setIsOpened={setIsOpened}
					/>
				</div>
			</header>

            <main>
                <div className="logout-button-container">
                    <button type="button" className='btn btn__img profile-logout' onClick={signOutWithGoogle}>Sign Out</button>
                </div>

                <div className="profile-picture-container">
                    <img src={pic} alt="Picture" className="profile-picture"/>
                </div>

                <div className="name-container">
                    {name}
                </div>

                <div className="container">
                    <RoutineList />
                </div>
            </main>
        </>
    )
}