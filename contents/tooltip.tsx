import styleText from "data-text:./tooltip.css"
import type {
  PlasmoCSConfig,
  PlasmoGetOverlayAnchor,
  PlasmoGetStyle
} from "plasmo"
import { useEffect, useState } from "react"

import { useMessage } from "@plasmohq/messaging/hook"

import { getUserByID } from "../lib/api"
import type { LikedUsers, Message, User } from "../lib/types"

export const config: PlasmoCSConfig = {
  matches: ["https://x.com/*"]
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.querySelector("#whofav-button")

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

export const getShadowHostId = () => "whofav-tooltip"

const Tooltip = () => {
  const [show, setShow] = useState(false)
  // const [users, setUsers] = useState<User[]>(null)
  const { data: message } = useMessage<Message, boolean>((req, res) => {
    setShow(req.body.open)
  })
  return (
    show && (
      <div id="tooltip">
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
    )
  )
}

export default Tooltip
