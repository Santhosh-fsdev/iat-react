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
  const [option, setOption] = useState("a");

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
    let payload = {
      title: question1,
      a: 0,
      b: 0,
      c: 0,
      d: 0,
    };
    if ((option === "a") | "A") {
      payload.a = 1;
    }
    if ((option === "b") | "B") {
      payload.b = 1;
    }
    if ((option === "c") | "C") {
      payload.c = 1;
    }
    if ((option === "d") | "D") {
      payload.d = 1;
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

      <Grid container>
        {question.length > 0 &&
          question.map((value, index) => {
            return <Question value={value} />;
          })}
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
              label="Option"
              value={option}
              onChange={(e) => setOption(e.target.value)}
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
