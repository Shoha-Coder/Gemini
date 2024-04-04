import React, { useContext, useState } from "react";
import "./index.scss";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSend, previousPrompt, setRecentPrompt, newChat } =
    useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSend(prompt);
  };
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          src={assets.menu_icon}
          className="menu"
          alt=""
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : ""}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            <div className="recentChats">
              {previousPrompt.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => loadPrompt(item)}
                    className={`recent-entry ${extended ? "active" : ""}`}
                  >
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0, 18)}...</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="bottom">
        <div className={`bottom-item recent-entry ${extended ? "active" : ""}`}>
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : ""}
        </div>
        <div className={`bottom-item recent-entry ${extended ? "active" : ""}`}>
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activities</p> : ""}
        </div>
        <div className={`bottom-item recent-entry ${extended ? "active" : ""}`}>
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : ""}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
