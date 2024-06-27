import styleText from "data-text:./tooltip.css";
import type {
  PlasmoCSConfig,
  PlasmoGetOverlayAnchor,
  PlasmoGetStyle,
} from "plasmo";
import { Suspense, useEffect, useState } from "react";

import { useMessage } from "@plasmohq/messaging/hook";
import { useStorage } from "@plasmohq/storage/hook";

// import { useMessage } from "../lib/util";
import type { Message } from "../lib/types";

export const config: PlasmoCSConfig = {
  matches: ["https://x.com/*"],
};

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.querySelector("#whofav-button");

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style");
  style.textContent = styleText;
  return style;
};

export const getShadowHostId = () => "whofav-tooltip";

const Loading = () => {
  console.log("loading");
  return <div>Loading...</div>;
};

const Tooltip = () => {
  const [mode, setMode] = useState<"light" | "dark" | null>(null);

  const [show, setShow] = useStorage("show", false);

  const { data: message } = useMessage<Message, void>(() => {
    setShow(true);
  });

  const nightMode = document.cookie.match(
    /(?:^|;\s*)night_mode=([0-9a-f]+)\s*(?:;|$)/,
  )?.[1];

  useEffect(() => {
    if (nightMode === "0") {
      setMode("light");
    } else if (nightMode === ("1" || "2")) {
      setMode("dark");
    }
  }, [nightMode]);

  return (
    show && (
      <>
        <div id="tooltip" {...(mode && { "data-theme": mode })}>
          <h2 id="title">いいねしたユーザ（最新{message.data.length}人）</h2>
          {message.data.map((user) => (
            <a href={`https://twitter.com/${user.screen_name}`} key={user.id}>
              <div className="user">
                <div className="avatar">
                  <img src={user.avatar} alt={user.name} />
                </div>
                <div className="info">
                  <div>
                    <div className="name">
                      <span>{user.name}</span>
                    </div>
                    <div className="screen_name">
                      <span>@{user.screen_name}</span>
                    </div>
                  </div>
                  <div className="description">
                    <span>{user.description}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div id="tooltip-backdrop" onClick={() => setShow(false)} {...{}} />
      </>
    )
  );
};

export default Tooltip;
