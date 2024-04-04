import React, { useContext, useRef } from "react";
import "./index.scss";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSend,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);
  const submitRef = useRef(null);
  const submit = async (e) => {
    e.preventDefault();
    onSend();
  };
  const cardSend = async (cardInput) => {
    await setInput(cardInput);
    setTimeout(async () => {
      await submit();
    }, 1000);
    await submitRef.current.click();
  };
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  cardSend(
                    "Suggest beautiful places to see on an upcoming road trip"
                  )
                }
              >
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  cardSend("Briefly summarize this concept: urban planning")
                }
              >
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  cardSend(
                    "Brainstorm team bonding activities for our work retreat"
                  )
                }
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  cardSend("Improve the readibility of the following code")
                }
              >
                <p>Improve the readibility of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <div>
                <img src={assets.user_icon} alt="" />
                <p>Dev</p>
              </div>
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <div>
                <img className="gemini-icon" src={assets.gemini_icon} alt="" />
                <p>Gemini</p>
              </div>
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <form
            className="search-box"
            name="prompt"
            onSubmit={(e) => submit(e)}
          >
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              name=""
              id=""
            />
            <div>
              <button
                name="prompt"
                role="button"
                type="submit"
                ref={submitRef}
                disabled={input == "" ? true : false}
              >
                <img src={assets.send_icon} onClick={() => onSend()} alt="" />
              </button>
            </div>
          </form>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people,
            double-check its responses. Your privacy and Gemini apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
