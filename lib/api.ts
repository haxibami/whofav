import type { LikedUsers, UserById, UsersByIds } from "./types";

const TOKEN =
  "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";

const getLikedUsers = async (tweetId: string, ct0: string) => {
  const res = await fetch(
    `https://api.x.com/1.1/statuses/${tweetId}/activity/summary.json?stringify_ids=1&cards_platform=Web-13&include_entities=1&include_user_entities=1&include_cards=1&send_error_codes=1&tweet_mode=extended&include_ext_alt_text=true&include_reply_count=true`,
    {
      headers: {
        Authorization: TOKEN,
        "X-Csrf-Token": ct0,
        "X-Twitter-Active-User": "yes",
        "X-Twitter-Auth-Type": "OAuth2Session",
        "X-Twitter-Client-Language": "en",
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  const data = await res.json();
  return data as LikedUsers;
};

const getUserByID = async (userId: string, ct0: string) => {
  const res = await fetch(
    encodeURI(
      `https://x.com/i/api/graphql/xf3jd90KKBCUxdlI_tNHZw/UserByRestId?variables={"userId":"${userId}","withSafetyModeUserFields":true}&features={"hidden_profile_subscriptions_enabled":true,"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"highlights_tweets_tab_ui_enabled":true,"responsive_web_twitter_article_notes_tab_enabled":true,"subscriptions_feature_can_gift_premium":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true}`,
    ),
    {
      headers: {
        Authorization: TOKEN,
        "X-Csrf-Token": ct0,
        "X-Twitter-Active-User": "yes",
        "X-Twitter-Auth-Type": "OAuth2Session",
        "X-Twitter-Client-Language": "en",
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  const data = await res.json();
  return data as UserById;
};

const getUsersByIds = async (userIds: string[], ct0: string) => {
  const userIdsStr = userIds.map((id) => `"${id}"`).join(",");
  const res = await fetch(
    encodeURI(
      `https://x.com/i/api/graphql/9UCmrCOmAn6TYy_Y13cSjA/UsersByRestIds?variables={"userIds":[${userIdsStr}]}&features={"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true}`,
    ),
    {
      headers: {
        Authorization: TOKEN,
        "X-Csrf-Token": ct0,
        "X-Twitter-Active-User": "yes",
        "X-Twitter-Auth-Type": "OAuth2Session",
        "X-Twitter-Client-Language": "en",
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  const data = await res.json();
  return data as UsersByIds;
};

export { getLikedUsers, getUserByID, getUsersByIds };
