import TweetSettings from "./components/TweetSettings";
import GeneratedTweet from "./components/GeneratedTweet";
import MainContext from "./MainContext";
import { useState, createRef, useEffect } from "react";
import { useScreenshot } from "use-react-screenshot";

function App() {
  const tweetRef = createRef(null);
  const downloadRef = createRef();
  const [text, setText] = useState("Naber Lan Kerata");
  const [retweet, setRetweet] = useState("13");
  const [quote, setQuote] = useState("11130");
  const [like, setLike] = useState("500");
  const [name, setName] = useState("Hasan KOMAN");
  const [username, setUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [language, setLanguage] = useState("english");
  const [darkMode, setDarkMode] = useState(false);
  const [image, takeScreenshot] = useScreenshot();

  const data = {
    tweetRef,
    downloadRef,
    takeScreenshot,
    setQuote,
    setLanguage,
    setDarkMode,
    setLike,
    setName,
    setUsername,
    setIsVerified,
    setAvatar,
    setText,
    setRetweet,
    language,
    image,
    darkMode,
    quote,
    like,
    name,
    username,
    isVerified,
    avatar,
    text,
    retweet,
  };

  useEffect(() => {
    if (image) {
      downloadRef.current.click();
    }
  }, [image]);

  return (
    <MainContext.Provider value={data}>
      <main className="main-bars">
        <TweetSettings />
        <GeneratedTweet />
      </main>
    </MainContext.Provider>
  );
}
export default App;
