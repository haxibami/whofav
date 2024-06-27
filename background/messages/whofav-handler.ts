import { sendToContentScript } from "@plasmohq/messaging";
import type { PlasmoMessaging } from "@plasmohq/messaging";

import { getLikedUsers, getUserByID, getUsersByIds } from "../../lib/api";
import type { LikedUsers, Message, User } from "../../lib/types";

const handler: PlasmoMessaging.MessageHandler<Message, void> = async (req) => {
  const { value: ct0 } = await chrome.cookies.get({
    url: "https://x.com",
    name: "ct0",
  });
  const { tweetId } = req.body;

  const likedUsers = await getLikedUsers(tweetId, ct0);
  const usersByIds = await getUsersByIds(likedUsers.favoriters, ct0);
  const users = usersByIds.data.users.map((user) => ({
    id: user.result.rest_id,
    name: user.result.legacy.name,
    screen_name: user.result.legacy.screen_name,
    description: user.result.legacy.description,
    avatar: user.result.legacy.profile_image_url_https.replace(
      "_normal",
      "_bigger",
    ),
  })) satisfies User[];
  await sendToContentScript({
    name: "inline-to-overlay",
    body: {
      ...req.body,
      data: users,
    },
  });
};

export default handler;
