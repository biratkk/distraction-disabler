
import { useContext, useState } from "react";
import Shortcut from "../Shortcut";

import { PromptVisibleContext } from '../../App'
export default function AddShortcut({addShortcuts}){
    const [adding, setAdding] = useState(false);
    const [shortcutUrl, setShortcutUrl] = useState("");
    const [imageSource, setImageSource] = useState('');
    const [searchQuery, setSearchQuery] = useState(false);
    const [nickname, setNickname] = useState("");

    
    const {setPromptEnterVisible , setCurrentSelection} = useContext(PromptVisibleContext);

    const formElements = {
        shortcutUrl:shortcutUrl,
        setShortcutUrl:setShortcutUrl,
        imageSource:imageSource,
        setImageSource:setImageSource,
        searchQuery:searchQuery,
        setSearchQuery:setSearchQuery,
        nickname:nickname,
        setNickname:setNickname,
        setPromptEnterVisible:setPromptEnterVisible,
        setCurrentSelection:setCurrentSelection,
        addShortcuts:addShortcuts,
    }

    const addShortCut = () => {
        if(!adding){
            setAdding(!adding)
        }
    };

    const cancelAdd = () => {
        if(adding){
            setAdding(!adding)
        }
    }

    let content = !adding ? GetDefault() : GetForm( cancelAdd, formElements);

    return (
        <div onClick = {addShortCut} className = {adding ? "add-shortcut-container" : "shortcut-container"}>
            {content}
        </div>
    )
}

const GetDefault = () => {
    return (
        <div>
            <div className = "logo-container">
                <img alt = "add new shortcut"
                    src = "https://iconape.com/wp-content/files/gr/367426/svg/add-circle-outline-logo-icon-png-svg.png"></img>
                </div>
                <div className = "shortcut-name-container">
                    Add new shortcut
            </div>
        </div>
        )
}

const GetForm = (cancelAdd, formElements) => {

    /**
     * have to destructure states from parent since there's more hooks than in 
     * the non form page?? Really weird from react
     */
    const {
        addShortcuts,
        shortcutUrl,
        setShortcutUrl,
        imageSource,
        setImageSource,
        searchQuery,
        setSearchQuery,
        nickname,
        setNickname,
    } = formElements;

    const handleURLChange = (e) => {
        setShortcutUrl(e.target.value);
    }
    
    const handleSearchQueryChange = (e) => {
        if(e.target.value === "Yes"){
            setSearchQuery(true);
        }
        else{
            setSearchQuery(false);
        }
    }

    const handleNicknameChange = (e) => {
        setNickname(e.target.value)
    }

    
    const handleImageChange = (e) => {
        setImageSource(e.target.value)
    }

    const handleSubmit = () => {
        console.log("Adding shortcut");
        addShortcuts(<Shortcut
            type = "manual"
            imageSource = {imageSource}
            name = {nickname}
            searchOption = {searchQuery}
            />)
    }

    return (
        <div className = "add-shortcut-forms-container">
            <form className = "add-shortcut-form">
                <label className = "add-shortcut-question">
                    Enter shortcut url
                </label>
                <input 
                className = "add-shortcut-answer"
                value = {shortcutUrl}
                onChange = {handleURLChange}
                >
                </input>
            </form>
            <form className = "add-shortcut-form">
                <label className = "add-shortcut-question">
                    Enter url to image cover (otherwise default will be used)
                </label>
                <input 
                className = "add-shortcut-answer"
                value = {imageSource}
                onChange = {handleImageChange}
                >
                </input>
            </form>
            <form className = "add-shortcut-form">
                <label className = "add-shortcut-question">
                    Is this a queried url?
                </label>
                <input className = "add-shortcut-radio" type="radio" name="queried_url" value="Yes"/>Yes
                <input className = "add-shortcut-radio" type="radio" name="queried_url" value="No"/>No
            </form>
            <form className = "add-shortcut-form">
                <label className = "add-shortcut-question">
                    Enter nickname for link
                </label>
                <input className = "add-shortcut-answer"
                value = {nickname}
                onChange = {handleNicknameChange}>
                </input>
            </form>
            <button className = "add-shortcut-button" onClick = {cancelAdd}>
                Cancel
            </button>
            <button onClick = {handleSubmit}>
                Submit
            </button>
        </div>
    )
}