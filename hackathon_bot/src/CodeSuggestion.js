import React, { useState } from 'react';
import "./CodeSuggestion.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark, darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./Spinner.css";
import LoadingSpinner from './LoadingSpinner';
//
import javascript from 'highlight.js/lib/languages/javascript';
import c from 'highlight.js/lib/languages/c';


function CodeSuggestion({ OPENAI_API_KEY }) {
  const [input, setInput] = useState("");       //for user input
  const [output, setOutput] = useState("");     //for api response
  const [isLoading, setIsLoading] = useState(false);    //for load spinner

  async function callOpenAIAPI() {
    console.log("Calling OpenAI API");
    setIsLoading(true);     //set Loading State to true
    const APIBody = {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": "Write a code for:" + input}],
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
    <div className="CodeSuggestion">
      <h1>Code Generator</h1>
      
      <div>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          placeholder= "Write a code for:"
          cols={50}
          rows={10}
        > Write a code for:</textarea>
      </div>
      <div>
        <button onClick={callOpenAIAPI} class="output-button"> 
          {isLoading? <LoadingSpinner/> : "Generate Code!"}
          </button>
        <h1>Generated Code</h1>
        <div className="output-box">
          {output !== "" ? (
            <pre>
                <code>
                    <SyntaxHighlighter 
                        language= {javascript} useInlineStyles= {true} style= { darcula }
                        showLineNumbers={true}>
                    {output}
                    </SyntaxHighlighter> 
                   
                </code>
                </pre>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CodeSuggestion;