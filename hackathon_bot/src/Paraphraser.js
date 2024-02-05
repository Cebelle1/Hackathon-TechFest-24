import React, { useState } from 'react';
import "./Paraphraser.css";
import "./Spinner.css";
import LoadingSpinner from './LoadingSpinner';


function Paraphraser({OPENAI_API_KEY}) {
  const [input, setInput] = useState("");   //for user input
  const [reply, setReply] = useState("");   //for api response
  const [isLoading, setIsLoading] = useState(false);  //for loadspinner

  async function callOpenAIAPI() {
    console.log("Calling OpenAI API")
    setIsLoading(true);
    const APIBody = {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": "Summarize this for high school graders: " + input}],
      "temperature": 0.7,
      "max_tokens": 64,
      "top_p": 1
    }

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " +OPENAI_API_KEY
      },
      body: JSON.stringify(APIBody) //turn the APIBody into string so it can be sent in request
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);  //Response is stored in 'data', for debugging
      console.log(data.choices[0].message.content);  //Grab the response content
      setReply(data.choices[0].message.content);
      setIsLoading(false);    //set loading back to false
    }); 

  }

  
  return (
    
    <div className="Paraphraser">
      <h1>Text Summarizer</h1>
      <div>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text here!"
          cols={50}
          rows={10}
        />
      </div>
      <div>
        <button onClick={callOpenAIAPI} class="output-button"> 
          {isLoading? <LoadingSpinner/> : "Get the Summarized Version!"}
        </button>
        
        <h1>Summarized Version</h1>
        <div className="output-box">
          {reply !== "" ? (
            <label>{reply}</label> //If not empty, show this
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Paraphraser;