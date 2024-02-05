import React, { useState } from 'react';
import "./GrammarFixer.css";
import "./Spinner.css";
import LoadingSpinner from './LoadingSpinner';


function GrammarFixer({ OPENAI_API_KEY }) {
  const [input, setInput] = useState("");       //for user input
  const [output, setOutput] = useState("");     //for api response
  const [isLoading, setIsLoading] = useState(false);    //for load spinner

  async function callOpenAIAPI() {
    console.log("Calling OpenAI API");
    setIsLoading(true);     //set Loading State to true
    const APIBody = {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": "Can you fix the grammar of this:" + input}],
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
    <div className="GrammarFixer">
      <h1>Grammar Fixer</h1>
      
      <div>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text here!"
          cols={50}
          rows={10}
        />
      </div>
      <div>
        <button onClick={callOpenAIAPI} class="output-button"> {isLoading? <LoadingSpinner/> : "Fix Grammar!"}</button>

        <h1>Fixed Grammar</h1>
        <div className="output-box">
          {output !== "" ? (
            <pre>
                <code>
                    {output}
                </code>
                </pre>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default GrammarFixer;