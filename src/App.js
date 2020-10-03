import React, { useEffect, useState } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import axios from "axios";
import Question from "./Question";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

function App() {
  const [time, setTime] = useState(0);
  const [question, setQuestion] = useState([]);
  const [load, setLoad] = useState(false);
  const [newqs, setNewQs] = useState({});
  const [question1, setQuestion1] = useState("");
  const [answer, setAnswer] = useState("");
  const [filter,setFilter] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios({
        method: "get",
        url: "https://iat-answer.herokuapp.com/allQuestions",
      })
        .then((res) => {
          if (res.data.statusCode === 200) {
            setQuestion(res.data.payload.data);
          }
        })
        .catch((err) => {
          window.alert(err.message);
        });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [time]);

  const addQuestion = () => {

    let answer1 = [];
    answer1.push(answer)
    let payload = {
      title: question1,
      answer: answer1
    }
    console.log(payload);
    axios({
      method: "post",
      url: `https://iat-answer.herokuapp.com/addQuestion`,
      data: payload,
    })
      .then((res) => {
        window.alert("answer Submitted");
        setLoad(false);
      })
      .catch((err) => {
        window.alert(err.message);
        setLoad(false);
      });
  };
  return (
    <div className="App">
      <h1>IAT-2 Answer Room</h1>
      <br />
      <Button variant="contained" color="primary" onClick={() => setLoad(true)}>
        {" "}
        Add Qs{" "}
      </Button>
      <br />
      <br />
      <input type="text" value={filter} placeholder="search keyword" onChange={(e)=>setFilter(e.target.value)} />
      <br />
      <br />

      <Grid container>
        { filter.length === 0 && question.length > 0 &&
          question.map((value, index) => {
            return <Question value={value} />;
          })}
          {
            filter.length > 1 && question.length > 0 && 
            question.filter(el => el.title.includes(filter)).map((value,index)=>{
               return <Question value={value} />
            })
          }
      </Grid>
      <Modal open={load} onClose={() => setLoad(false)}>
        <Card>
          <div style={{ textAlign: "center" }}>
            <h1>Add Question</h1>
            <br />
            <TextField
              id="outlined-basic1"
              label="question"
              value={question1}
              onChange={(e) => setQuestion1(e.target.value)}
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              id="outlined-basic1"
              label="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              variant="outlined"
            />
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={addQuestion}>
              {" "}
              Add Qs{" "}
            </Button>
          </div>
        </Card>
      </Modal>
    </div>
  );
}

export default App;
