import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function getOptionId(j, i){
  const index = i+1;
  const str = "q" + j + "_" + index;
  return String(str); 
}

function Question() {
  const [complete, setComplete] = useState(false)  // true if answered all questions
  const [contents, setContents] = useState([])     // to store questions
  const [ans, setAns] = useState([])               // to record your answers
  const [score, setScore] = useState(0)            // Your score
  const [current_question, setCurrentQuestion] = useState(0) // index to current question

  const getScore = async() => {
    const {
      data: { message, score }
    } = await instance.post('/checkAns', { params: { ans } })
    console.log("getScore: " + message);
    setScore(Number(score));
  }

  const next = () => {
    // TODO : switch to the next question,
    // and check answers to set the score after you finished the last question
    if(current_question+1 === contents.length){
      //TODO: check Ans
      getScore();
      setComplete(true);
    }else{
      //不會用只好這樣寫
      ans[ current_question+1 ]= ans[ current_question]
      setAns([...ans]);


      setCurrentQuestion(current_question+1);
    }
  }

  const choose = (i) => {
    // TODO : update 'ans' for the option you clicked
    ans[current_question]=Number(i+1)
    setAns([...ans]);
    
    console.log("set ans:"+Number(i+1));
    console.log(contents[current_question].options[i]);
    console.log(ans);
  }

  const getQuestions = async() => {
    // TODO : get questions from backend
    const {
      data: { message, contents }
    } = await instance.get('/getContents');
    
    console.log("getQuestions" + message);
    console.log(contents);
    if(message === 'success'){
      setContents(contents)
    }
  }

  useEffect(() => {
    if (!contents.length)
      getQuestions()
  })

  // TODO : fill in the rendering contents and logic
  return (
    <div id="quiz-container">
      {contents.length ?
        <React.Fragment>
          <div id="question-box">
            <div className="question-box-inner">
              Question {contents[current_question].questionID} of {contents.length}
            </div>
          </div>

          {complete?
            <div id="question-title">
            Your Score: {score} / {contents.length}
            </div>
            :<div id="question-title">
              {contents[current_question].question}
            </div>
          }

          {complete?
            <div></div>
            :<div id="options">
              {contents[current_question].options.map((ele, i)=>(
                <div className="each-option" key={i} onChange={(e) => choose(i)}>
                  <input type="radio" name="options" id={getOptionId(contents[current_question].questionID, i) } />
                  <span> {ele} </span>
                </div>
              ))}
            </div>
          }
          
          {complete?
            <div></div>
            :<div id="actions" onClick={next}>
              NEXT
            </div>
          }

        </React.Fragment>
        : <React.Fragment></React.Fragment>
      }
    </div>
  )
}

export default Question
