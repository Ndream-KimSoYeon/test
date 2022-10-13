export const PAGES_URL = {
  HOME: 'Home',
  MAP: '/',
  FEED: 'feed',
  STORY_READ: 'story-read/3',
  SEARCH: 'search',
  MAP_SEARCH: 'map-search',
  STORY_SEARCH: 'story-search',
  USER_SEARCH: 'user-search',
  PROFILE: 'profile',
  ITEM: 'item',
  ITEM_SET: 'item-set',
  FOLLOW_LIST: 'follow-list',
  ALARM: 'alarm',
  MY_STORY: 'mypage/story',
  STORY_SAVE: 'story-save',
  RECOMMEND: 'feed/recommend',
  OFFICIAL: 'feed/official',
  FOLLOWING: 'feed/following',
  SCRAP: 'mypage/scrap',
  FAVORITE: 'mypage/favorite',
  LOGIN: 'login',
  MENU: 'menu',
  BLOCK_LIST: 'profile/block',
  AVATAR_MANAGE: 'avatar/manage',
  AVATAR_CREATE: 'avatar/create'
} as const;

export const CITYHALL_COORDINATE = {
  lat: 37.56648021667982,
  lng: 126.97792745301268
};

export const POINT_LIST_ITEM_HEIGHT = 80;
export const POINT_LIST_GUTTER = 16;
export const POINT_LIST_MAX_HEIGHT = 300;

// TODO: webview app.tsx에도 동일하게 선언 되어 있음. 추후 monorepo를 적용해야 한 곳에서 const.ts 로 관리할 수 있을 듯
export const WEB_TO_APP_MESSAGE_TYPES = {
  USER_LOCATION: 'USER_LOCATION',
  UUID: 'UUID',
  FCM_TOKEN: 'FCM_TOKEN',
  IMAGE_PICKED: 'IMAGE_PICKED'
} as const;
