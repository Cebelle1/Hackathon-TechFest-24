import React, { useState } from 'react';
import "./Translator.css";
import "./Spinner.css";
import LoadingSpinner from './LoadingSpinner';
import { BsTranslate } from "react-icons/bs";
import { IoMdSwap } from "react-icons/io";

function Translator({ OPENAI_API_KEY }) {
  const [textinput, settextInput] = useState("");       //for user input
  const [output, setOutput] = useState("");     //for api response
  const [isLoading, setIsLoading] = useState(false);    //for load spinner
  const [lan1input, setlan1Input] = useState("");
  const [lan2input, setlan2Input] = useState("");   //

  async function callOpenAIAPI() {
    console.log("Calling OpenAI API");
    setIsLoading(true);     //set Loading State to true
    const APIBody = {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": "Translate from "+ lan1input+ "to "+ lan2input + ":" + textinput}],
      "temperature": 0.7,
      "max_tokens": 500,
      "top_p": 1
    }

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_API_KEY
      },
      body: JSON.stringify(APIBody) //turn the APIBody into string so it can be sent in request
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);  //Response is stored in 'data', for debugging
      console.log(data.choices[0].message.content);  //Grab the response content
      setOutput(data.choices[0].message.content.toString());
      setIsLoading(false);  //set Loading state to false
      
    }); 

  }

  return (
    <div className="Translator" >
       
      <h1 className="tt-h1">Text Translator</h1>
      <div class="tt-container">
        <div class="tt-lang-input-container">
          <div class="tt-lang-row-container">
            <textarea class="tt-lang-input" 
               placeholder="Translate From:"
               onChange={(e) => setlan1Input(e.target.value)}
            />
            <textarea class="tt-textarea"
               placeholder="Translate From:"
               onChange={(e) => settextInput(e.target.value)}
            />
          </div>
         <div class="tt-button-container">
            <button onClick={callOpenAIAPI} class="tt-output-button"> {isLoading? <LoadingSpinner/> :<IoMdSwap />}</button>
         </div>
          
          <div class="tt-lang-row-container">
            <textarea class="tt-lang-input" 
               placeholder="Translate To:" 
               onChange={(e) => setlan2Input(e.target.value)}
            />
            <div class="tt-output-box">
              <pre><code>
                 
                     {output}
                 
               </code></pre>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
}

export default Translator;