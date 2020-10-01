import React,{useState} from "react";
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from '@material-ui/core/Button';
import axios from "axios"

function Question(props) {

    
  const [option,setOption] = useState("none");
  const [answer,setAnswer] = useState("");
  const [pop,setPop] = useState("");
  const [count,setCount] = useState(0);
    const {value} = props


    const answerQuestion = (value) =>{
        console.log(value.answer)
        const selected = "";
        let payload = {
            title : value.title,
            answer: [...value.answer,answer]
        }
        console.log(payload)
        axios({
            method:"post",
            url:`https://iat-answer.herokuapp.com/editQuestion/${value._id}`,
            data: payload
        })
        .then((res)=>{
            window.alert("answer Submitted")
            setAnswer("");
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
          <br />
          <h3>Answers</h3><span style={{color:"red"}}>Find the most repeated one</span>
           {value.answer.map((answer)=>{
               return <p>{answer}</p>
           })}
           <TextField
            id="outlined-basic"
            label="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            variant="outlined"
          />

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
