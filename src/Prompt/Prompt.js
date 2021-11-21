import { useState } from "react";
export default function Prompt({currentSelection, functions, link}){
    const [text, setText] = useState("");

    let {
        setPromptEnterVisible
    } = functions;

    let formattedCurrentSelection = currentSelection.charAt(0).toUpperCase() 
    + currentSelection.substring(1, currentSelection.length)
    
    const submitResult = () => {
        openInNewTab(link+text);
        setPromptEnterVisible(false);
    }

    return (
        <div className = "prompt-page">
            <div className = "prompt-container">
            <Question>
            {formattedCurrentSelection}
            </Question>
            <Answer 
            setText = {setText} 
            text = {text}
            submitResult = {submitResult}/>
            <CancelButton
            setPromptEnterVisible = {setPromptEnterVisible}
            />
            <SubmitButton
            text = {text}
            submitResult = {submitResult}/>
            </div>
        </div>
    )
}

function Question(props){
    return (
        <div className = "prompt-question">
            {props.children}
        </div>
    )
}

function Answer({setText, text, submitResult}){

    const handleChange = (e) => {        
        setText(e.target.value);
    }
    const checkForSubmission = (e) => {
        if(e.key === "Enter"){
            submitResult(text);
        }
    }
    return (
        <input 
        className = "prompt-input" 
        type="text" value = {text}
        onKeyDown = {checkForSubmission} 
        onChange={handleChange} 
        autoFocus = {true}/>
    )
}

function SubmitButton(props){
    

    const handleClick = () => {
        props.submitResult(props.text);
    }
    

    return (
        <button className = "prompt-button search" onClick = {handleClick}>
            Search
        </button>
    )
}

function CancelButton(props){
    

    const handleClick = () => {
        props.setPromptEnterVisible(false);
    }
    

    return (
        <button className = "prompt-button cancel" onClick = {handleClick}>
            Cancel
        </button>
    )
}



const openInNewTab = (url) => {
    window.open(url, '_blank');
}