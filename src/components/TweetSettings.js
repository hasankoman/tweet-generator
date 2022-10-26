import { useContext } from "react";
import MainContext from "../MainContext";

const TweetSettings = () => {
  const {
    setQuote,
    setLike,
    setName,
    setUsername,
    setIsVerified,
    setAvatar,
    setText,
    setRetweet,
    language,
    tweetRef,
    takeScreenshot,
    image,
    downloadRef,
  } = useContext(MainContext);

  const getImage = () => {
    console.log("xd");
    takeScreenshot(tweetRef.current);
  };

  const avatarHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      setAvatar(this.result);
    });
    reader.readAsDataURL(file);
  };

  return (
    <div className="tweet-settings-bar">
      <h3 className="title">Tweet Settings</h3>
      <div className="form-container">
        <form action="" id="form">
          <label htmlFor="name-surname">
            {language === "english" ? "Name Surname" : "Ad Soyad"}
          </label>
          <input
            type="text"
            id="name-surname"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="username">
            {language === "english" ? "Username" : "Kullanıcı Adı"}
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="tweet-text">Tweet</label>
          <textarea
            id="tweet-text"
            rows={4}
            onChange={(e) => setText(e.target.value)}
          />
          <label htmlFor="avatar">Avatar</label>
          <input type="file" id="avatar" onChange={(e) => avatarHandle(e)} />
          <label htmlFor="retweet">Retweet</label>
          <input
            type="number"
            id="retweet"
            onChange={(e) => setRetweet(e.target.value)}
          />
          <label htmlFor="quote-tweets">
            {language === "english" ? "Quote Tweets" : "Alıntı Tweetler"}
          </label>
          <input
            type="number"
            id="quote-tweets"
            onChange={(e) => setQuote(e.target.value)}
          />
          <label htmlFor="like">
            {language === "english" ? "Like" : "Beğeni"}
          </label>
          <input
            type="number"
            id="like"
            onChange={(e) => setLike(e.target.value)}
          />
          <label htmlFor="verified-account">
            {language === "english" ? "Verified Account" : "Doğrulanmış Hesap"}
          </label>
          <select
            id="verified-account"
            onChange={(e) => setIsVerified(e.target.value)}
          >
            <option value={false}>
              {language === "english" ? "No" : "Hayır"}
            </option>
            <option value={true}>
              {language === "english" ? "Yes" : "Evet"}
            </option>
          </select>
          <button type="button" onClick={getImage}>
            Oluştur
          </button>
          <div className="download-url">
            {image && (
              <a ref={downloadRef} href={image} download="tweet.png">
                Tweeti İndir
              </a>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TweetSettings;
