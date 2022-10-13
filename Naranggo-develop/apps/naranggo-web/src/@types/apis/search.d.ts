interface UserSearchData {
  userId: string;
  text: string;
  profilepath: string;
}

interface MapSearchData {
  text: string;
  address: string;
}

interface StorySearchData {
  title: string;
  date: string;
  userId: string;
  like: number;
  comment: number;
  image: string;
}
