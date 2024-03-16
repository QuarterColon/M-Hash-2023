import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { UserContext } from "../../UserContext";

const Card = () => {
  // const [userData, setUserData] = useState();
  const {currentUser, userData} = useContext(UserContext)

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const user = auth.currentUser;
  //       console.log(user.uid)

  //       if (user) {
  //         const userRef = doc(db, "users", user.uid); 
  //         const data = await getDoc(userRef);

  //         if (data.exists) {
  //           console.log(data)
  //           setUserData(data.data());
  //         } else {
  //           console.log("no doc");
  //         }
  //       } else {
  //         console("no user");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchUserData()
  // }, []);
  return (
    <div className="my-flex-props">
      <div className="card-dash" style={{backgroundColor: "#ECB75C"}}>
        <div style={{ display: "flex", justifyContent: "end"}}>
         
        </div>
        <p>{userData?.coins}</p>
        <p>Points</p>
      </div>

      <div className="card-dash" style={{backgroundColor: "#E27FD8"}}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-arrow-up-right-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8zm5.904 2.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707l-4.096 4.096z" />
          </svg>
        </div>
        <p>{userData?.level}</p>
        <p>Level</p>
      </div>

      <div className="card-dash" style={{backgroundColor: "#7FE2B3"}}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-fire"
            viewBox="0 0 16 16"
          >
            <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
          </svg>
        </div>
        <p>{userData?.streak}</p>
        <p>Streak</p>
      </div>
    </div>
  );
};

export default Card;
