export interface LikedUsers {
  favoriters?: string[];
  repliers?: string[];
  retweeters?: string[];
  favoriters_count?: string;
  repliers_count?: string;
  retweeters_count?: string;
}

export interface UserResult {
  result: {
    // __typename: string
    // id: string
    rest_id: string;
    // // affiliates_highlighted_label: {}
    // has_graduated_access: boolean
    // is_blue_verified: boolean
    // profile_image_shape: string
    legacy: {
      // followed_by: boolean
      // following: boolean
      // can_dm: boolean
      // can_media_tag: boolean
      // created_at: string
      // default_profile: boolean
      // default_profile_image: boolean
      description: string;
      // entities: {
      //   description: {
      //     urls: string[]
      //   }
      // }
      // fast_followers_count: number
      // favourites_count: number
      // followers_count: number
      // friends_count: number
      // has_custom_timelines: boolean
      // is_translator: boolean
      // listed_count: number
      // location: string
      // media_count: number
      name: string;
      // normal_followers_count: number
      // pinned_tweet_ids_str: string[]
      // possibly_sensitive: boolean
      // profile_banner_url: string
      profile_image_url_https: string;
      // profile_interstitial_type: string
      screen_name: string;
      // statuses_count: number
      // translator_type: string
      // verified: boolean
      // want_retweets: boolean
      // withheld_in_countries: []
    };
    // tipjar_settings: {}
    // smart_blocked_by: boolean
    // smart_blocking: boolean
    // business_account: {}
    // highlights_info: {
    //   can_highlight_tweets: boolean
    //   highlighted_tweets: string
    // }
    // user_seed_tweet_count: number
    // creator_subscriptions_count: number
    // has_hidden_subscriptions_on_profile: boolean
  };
}

export interface UserById {
  data: {
    user: UserResult;
  };
}

export interface UsersByIds {
  data: {
    users: UserResult[];
  };
}

export interface User {
  id: string;
  name: string;
  screen_name: string;
  avatar: string;
  description: string;
}

export interface Message {
  open: boolean;
  tweetId?: string;
  data?: User[];
}
