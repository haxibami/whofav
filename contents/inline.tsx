import styleText from "data-text:./inline.css"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoGetOverlayAnchor,
  PlasmoGetStyle
} from "plasmo"
import { useEffect, useRef, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

// import injected from "url:~injected.css"

import { getLikedUsers, getUserByID } from "../lib/api"
import type { LikedUsers } from "../lib/types"

// const styleEl = document.createElement("link")
// styleEl.rel = "stylesheet"
// styleEl.href = injected
// const target = document.head || document.documentElement
// target.appendChild(styleEl)

export const config: PlasmoCSConfig = {
  matches: ["https://x.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector(
    "div:has(> div > div > [data-testid='tweetText']) > :nth-child(4) > div > div > div > :nth-child(3)"
  )

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

export const getShadowHostId = () => "whofav-button"

const PlasmoInline = () => {
  //   const clickOutside = (e: MouseEvent) => {
  //     if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
  //       setShow(false)
  //     }
  //   }
  //   useEffect(() => {
  //     document.addEventListener("click", clickOutside)
  //     return () => {
  //       document.removeEventListener("click", clickOutside)
  //     }
  //   })
  // const tooltipRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  // const [likedUsers, setLikedUsers] = useState<LikedUsers>({})
  return (
    <>
      <div
        style={{
          color: "rgb(113, 118, 123)",
          padding: "0px 4px"
        }}>
        <span>·</span>
      </div>
      <div id="container">
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0",
            appearance: "none"
          }}
          onClick={async () => {
            if (!show) {
              setShow(!show)
              const tweetId = window.location.pathname.split("/").pop()
              await sendToBackground({
                name: "whofav-handler",
                body: {
                  open: true,
                  tweetId
                }
              })
            } else {
              setShow(!show)
              await sendToBackground({
                name: "whofav-handler",
                body: {
                  open: false
                }
              })
            }
          }}
          {...(show ? { "data-show": "" } : {})}>
          <span>😍</span>
        </button>
      </div>
    </>
  )
}

export default PlasmoInline
