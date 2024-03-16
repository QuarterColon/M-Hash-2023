import React, { useContext, useState } from "react";
import posed from "react-pose";
import "./UnscrambleGame.css";
import { Button } from "reactstrap";
import LoaderPink from './LoaderPink'
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Animation = posed.div({
  scramble: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1000 },
  },
  unscramble: {
    opacity: 0,
    scale: 1.2,
    transition: { duration: 1000 },
  },
});

const UnscrambleGame = () => {
  const scrambleWord = (word) => {
    return word
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");
  };

  const {currentUser, userData} = useContext(UserContext)

  const wordList = ["unscramble", "gorgeous", "maroon", "development", "local"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrambled, setIsScrambled] = useState(true);
  const [userAnswer, setUserAnswer] = useState("");
  const [scrambledWord, setScrambledWord] = useState(scrambleWord(wordList[0]));
  const[points, setPoints] = useState()

  const toggleScramble = () => {
    setIsScrambled((prevIsScrambled) => !prevIsScrambled);
  };

  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const checkAnswer = async() => {
    const currentWord = wordList[currentIndex].toLowerCase();

    if (userAnswer.toLowerCase() === currentWord) {
      
      alert("Correct! You unscrambled the word.");
      await updateDoc(doc(db, "users", currentUser?.uid), {
        coins : (userData.coins)+ 10
      })
      goToNextWord();
    } else {
      alert("Try again. Your answer is incorrect.");
    }
    setUserAnswer("");
  };

  const goToNextWord = () => {
    if (currentIndex < wordList.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsScrambled(true);
      setUserAnswer("");
      setScrambledWord(scrambleWord(wordList[currentIndex + 1]));
    } else {
      alert("You have completed all words!");
    }
  };

  return (
    <div className="unscramble-container" style={{ paddingTop: "200px"}}>
    <div >

      <h2 className="title-scramble" style={{color: "#404040", letterSpacing: "5px"}}>UNSCRAMBLE THE WORD</h2>

      <Animation
        pose={isScrambled ? "scramble" : "unscramble"}
        className="word-animation"
        style={{ fontFamily: "monospace", fontSize: "2.5rem",fontWeight: "500", letterSpacing: "20px" }}
      >
        {isScrambled ? scrambledWord : wordList[currentIndex]}
      </Animation>
      <div className="answer-container">
        <input type="text" value={userAnswer} placeholder="Enter Word" onChange={handleChange} />
      </div>

      <div style={{display: "flex", gap: "50px", justifyContent: "center"}}>
        <Button color="primary" outline onClick={toggleScramble}>
          {isScrambled ? "Unscramble" : "Scramble"}
        </Button>
        <Button color="secondary" outline onClick={checkAnswer}>
          Submit
        </Button>
      </div>
      <br />
      <br />
      <LoaderPink />
      <Link to='/home'>
      <Button
    color="danger"
    outline
    style={{marginTop: "20px"}}
  >
    {'< '}Back
  </Button>
  </Link>
    </div>
    </div>
  );
};

export default UnscrambleGame;
