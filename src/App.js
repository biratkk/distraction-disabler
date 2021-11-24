
import './App.css';
import Prompt from './Prompt/Prompt';
import Shortcut from './Shortcuts/Shortcut';
import AddShortcut from './Shortcuts/AddShortcut/AddShortcut'
import { createContext, useContext, useEffect, useState } from 'react';
import Store from './Store'

export const PromptVisibleContext = createContext('functions');
const userDataStore = new Store({
  configName:"shortcuts",
  defaults:{
    shortcutArray:[]
  }
});

const getShorcutsFromProgramData = () => {
  return userDataStore.get('shortcutArray');
}

const setShorcutsToProgramData = (shortcuts) => {
  userDataStore.set('shorcutArray', shortcuts);
}

export default function App() {
  const [promptEnterVisible, setPromptEnterVisible] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);
  const functions = {
    setPromptEnterVisible:setPromptEnterVisible,
    setCurrentSelection:setCurrentSelection
  }

  const [defaultShortcuts, setDefaultShortcuts] = useState([
      <Shortcut 
        setPromptEnterVisible = {setPromptEnterVisible}
        setCurrentSelection = {setCurrentSelection}
        functions = {functions}
        link = "https://www.google.com/search?q="
        name = "Google Search" 
        type = "google" 
        searchField = {true}/>,
      <Shortcut
        setPromptEnterVisible = {setPromptEnterVisible}
        setCurrentSelection = {setCurrentSelection}
        functions = {functions}
        link = "https://www.youtube.com/results?search_query="
        name = "Youtube Search" 
        type = "youtube" 
        searchField = {true}/>,
      <Shortcut
        setPromptEnterVisible = {setPromptEnterVisible}
        setCurrentSelection = {setCurrentSelection}
        functions = {functions}
        link = "https://www.reddit.com/search/?q="
        name = "Reddit Search" 
        type = "reddit" 
        searchField = {true}/>,
      <Shortcut 
        setPromptEnterVisible = {setPromptEnterVisible}
        setCurrentSelection = {setCurrentSelection}
        functions = {functions}
        link = "https://duckduckgo.com/?q="
        name = "DuckDuckGo Search" 
        type = "duckduckgo" 
        searchField = {true}/>
  ])

  useEffect(() => {
    let extraShortcuts = getShorcutsFromProgramData();
    addShortcuts(extraShortcuts);
  }, [])

  const addShortcuts = (elementToAdd) => {
    let temp = defaultShortcuts;
    setShorcutsToProgramData(temp);
    temp.push(elementToAdd);
    setDefaultShortcuts(temp);
  }
  if(!promptEnterVisible){
    return (
      <div className = "shortcuts">
        <PromptVisibleContext.Provider value = {functions}>
          {defaultShortcuts}
          <AddShortcut addShortcuts = {addShortcuts}/>
        </PromptVisibleContext.Provider>
      </div>
    )
  }
  else{
    return (
      <div className = "prompt">
        <Prompt functions = {functions}
        currentSelection = {currentSelection.name}
        link = {currentSelection.link}/>
      </div>
    )
  }

  
}

