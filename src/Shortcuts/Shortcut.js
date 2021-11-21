import "./ShortcutStyle.css"

const LINK_TO_COVER_PAGE = "https://i.picsum.photos/id/516/200/200.jpg?hmac=CsDADXBJh2feopw8BAy8PQ6Ma5u0as6pKj5EuJ7zyMw";


export default function(props){

    /**
     * Destructure props into relevant variables
     */
    let {
        type, searchOption, name, setPromptEnterVisible, setCurrentSelection, link
    } = props;
    return (
        <ShortcutApp
        setPromptEnterVisible = {setPromptEnterVisible}
        setCurrentSelection = {setCurrentSelection}
        type = {type}
        searchOption = {searchOption}
        name = {name}
        link = {link}
        />
    )
}

function ShortcutApp(props){
/**
 * Default pattern for shortcuts
 * switch(type){
            case "youtube":
                break;
            case "google":
                break;
            case "reddit":
                break;
            case "duckduckgo":
                break;
        }
 */
    let {
        type, name, link, imgSource
    } = props;

    const getImageSource = (type, imgSource) => {
        switch(type){
            case "youtube":
                return "https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
            case "google":
                return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
            case "reddit":
                return "https://www.redditinc.com/assets/images/site/reddit-logo.png"
            case "duckduckgo":
                return "https://duckduckgo.com/assets/logo_homepage.normal.v108.svg"
            case "manual":
                return imgSource === undefined ? LINK_TO_COVER_PAGE : imgSource
        }
    }

    const handleClick = () => {
        // if(type === "manual"){
        //     props.setCurrentSelection
        // }
        console.log(props);
        props.setCurrentSelection({name:name, link:link});
        props.setPromptEnterVisible(true);
    }

    return (
        <button className = "shortcut-container" onClick = {handleClick}>
            <div className = "logo-container">
                <img className = "logo" alt = {name} src = {getImageSource(type, imgSource)}></img>
            </div>
            <div className = "shortcut-name-container">
                {name}
            </div>
        </button>
    )
}