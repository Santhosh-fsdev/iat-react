import React,{useState} from "react";
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from '@material-ui/core/Button';
import axios from "axios"

function Question(props) {

    
  const [option,setOption] = useState("none");
  const [answer,setAnswer] = useState("");
    const {value} = props

    const answerQuestion = (value) =>{
        const selected = "";
        let payload = {
            title : value.title,
            a:0,
            b:0,
            c:0,
            d:0

        };
        if(option === "a" | "A"){
            payload.a = 1
        }
        if(option === "b" | "B"){
            payload.b = 1
        }
        if(option === "c" | "C"){
            payload.c = 1
        }
        if(option === "d" | "D"){
            payload.d = 1
        }
        console.log(payload)
        axios({
            method:"post",
            url:`https://iat-answer.herokuapp.com/editQuestion/${value._id}`,
            data: payload
        })
        .then((res)=>{
            window.alert("answer Submitted")
        })
        .catch((err)=>{
            window.alert(err.message)
        })
    }
  return (
    <Grid item xs={12} sm={4} className="question">
      <Card>
        <div>
          <p>
            Question <b>{value.title}</b>
          </p>

          <TextField
            id="outlined-basic3"
            label="Option"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            variant="outlined"
          />
          {/* <TextField
            id="outlined-basic"
            label="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            variant="outlined"
          /> */}
          <br />
          <br />
          <p>Answer count - A (<b>{value.a}</b>) B (<b>{value.b}</b>) C(<b>{value.c}</b>) D(<b>{value.d}</b>)</p>
          <br />
          <br />
          <Button variant="contained" color="primary" onClick={()=>answerQuestion(value)}> Answer </Button>
          <br />
          <br />
        </div>
      </Card>
    </Grid>
  );
}

export default Question;
