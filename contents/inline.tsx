import styleText from "data-text:./inline.css";
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoGetStyle,
} from "plasmo";
import { useEffect } from "react";

import { sendToBackground } from "@plasmohq/messaging";
import { useStorage } from "@plasmohq/storage/hook";

export const config: PlasmoCSConfig = {
  matches: ["https://x.com/*"],
  exclude_matches: ["https://x.com/i/tweetdeck"],
};

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector(
    `div:has(> div > a[href*='/status/'][aria-describedby] > time ) > div:last-child`,
  );

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style");
  style.textContent = styleText;
  return style;
};

export const getShadowHostId = () => "whofav-button";

const rawCss = `
plasmo-csui {
  color-scheme: inherit;
}
`;

const target = document.head || document.documentElement;
const styleEl = document.createElement("style");
styleEl.textContent = rawCss;
target.appendChild(styleEl);

const Inline = () => {
  const [show, setShow] = useStorage("show");

  useEffect(() => {
    setShow(false);
  }, [setShow]);

  return (
    <>
      <div
        style={{
          color: "rgb(113, 118, 123)",
          padding: "0px 4px",
        }}
      >
        <span>·</span>
      </div>
      <div id="container">
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0",
            appearance: "none",
          }}
          onClick={async () => {
            if (!show) {
              const tweetId = window.location.pathname.split("/").pop();
              await sendToBackground({
                name: "whofav-handler",
                body: {
                  open: true,
                  tweetId,
                },
              });
            } else {
              setShow(!show);
            }
          }}
          {...{}}
        >
          <span>😍</span>
        </button>
      </div>
    </>
  );
};

export default Inline;
