import {
  ReplyIcon,
  RetweetIcon,
  LikeIcon,
  ShareIcon,
  VerifiedIcon,
} from "../icons";
import { useContext } from "react";
import MainContext from "../MainContext";
import { FormatNumber, AvatarLoader } from "../helper";

function convertImgToBase64(url, callback, outputFormat) {
  var canvas = document.createElement("CANVAS");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL(outputFormat || "image/png");
    callback.call(this, dataURL);
    // Clean up
    canvas = null;
  };
  img.src = url;
}

const GeneratedTweet = () => {
  const {
    quote,
    like,
    name,
    username,
    isVerified,
    avatar,
    text,
    retweet,
    darkMode,
    setUsername,
    setDarkMode,
    language,
    setLanguage,
    tweetRef,
    setQuote,
    setLike,
    setName,
    setIsVerified,
    setAvatar,
    setText,
    setRetweet,
  } = useContext(MainContext);

  const fetchTwitterInfo = () => {
    fetch(
      `https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=${username}`
    )
      .then((res) => res.json())
      .then((data) => {
        const twitter = data[0];

        convertImgToBase64(
          twitter.profile_image_url_https,
          function (base64Image) {
            setAvatar(base64Image);
          }
        );
        setName(twitter.name);
        setText(twitter.status.text);
      });
  };

  return (
    <div className="generated-tweet">
      <header id="header">
        <div className="languages">
          <span
            className={language === "türkçe" ? "active" : ""}
            onClick={() => setLanguage("türkçe")}
            disabled={language === "türkçe"}
          >
            Türkçe
          </span>
          <span
            className={language === "english" ? "active" : ""}
            onClick={() => setLanguage("english")}
            disabled={language === "english"}
          >
            English
          </span>
        </div>
        <div className="modes">
          <span
            className={darkMode ? "active" : ""}
            onClick={() => setDarkMode(true)}
            disabled={darkMode}
          >
            Dark
          </span>
          <span
            className={darkMode ? "" : "active"}
            onClick={() => setDarkMode(false)}
            disabled={!darkMode}
          >
            Light
          </span>
        </div>
      </header>
      <div id="tweet-generate-container">
        <div className="take-account">
          <form action="">
            <input
              type="text"
              placeholder={
                language === "english"
                  ? "Enter Twitter Username"
                  : "Twitter Kullanıcı Adını Giriniz"
              }
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="button" onClick={fetchTwitterInfo}>
              {language === "english" ? "Get Information" : "Bilgileri Çek"}
            </button>
          </form>
        </div>
        <div className="tweet" ref={tweetRef}>
          <header className="tweet-header">
            {(avatar && <img src={avatar} alt="" />) || <AvatarLoader />}
            <div className="header-text">
              <h4>
                {name} {isVerified === "true" ? <VerifiedIcon /> : ""}
              </h4>
              <h6>@{username}</h6>
            </div>
          </header>
          <p className="tweet-text">{text}</p>
          <div className="tweet-info">
            <span>
              <strong>{FormatNumber(retweet)}</strong>Retweet
            </span>
            <span>
              <strong>{FormatNumber(quote)}</strong>
              {language === "english" ? "Quote Tweets" : "Alıntı Tweetler"}
            </span>
            <span>
              <strong>{FormatNumber(like)}</strong>
              {language === "english" ? "Likes" : "Beğeni"}
            </span>
          </div>
          <div className="tweet-buttons">
            <ReplyIcon />
            <RetweetIcon />
            <LikeIcon />
            <ShareIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedTweet;
