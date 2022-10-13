interface StoryItem {
  idblog: number;
  tag: any[];
  contents: string;
  userId: number;
  title: string;
  nickname: string;
  profilepath: string;
  islike: number;
  likecount: number;
  summary: string;
  lat: number;
  lng: number;
  representative: string;
  estimatedtime: number;
  createdtime: string;
  lastmodifiedtime: string;
  count: number;
  playable: number;
  replycount: number;
  replycountsum: number;
  pointcount: number;
  distance: number;
  agecheck: number;
  isplan: number;
  isaudio: number;
  isofficial: number;
  istourapi: number;
}

interface StoryReadData {
  idblog: number;
  tag: string;
  userid: number;
  isfollow: 1 | 0;
  islike: 1 | 0;
  contents: string;
  title: string;
  lat: number;
  lng: number;
  summary: string;
  estimatedtime: number;
  createdtime: string;
  lastmodifiedtime: string;
  nickname: string;
  profilepath: string;
  playable: number;
  publicsetting: number;
  representative: string;
  replycount: number;
  replycountsum: number;
  likecount: number;
  scrapcount: number;
  pointcount: number;
  completedcount: number;
  completedcountsum: number;
  agecheck: number;
  isplan: number;
  isaudio: number;
  istourapi: number;
}

interface TextBlockData {
  audioFileName: string;
  audioPath: string;
  isNowLoadingState: [0, 0];
  mode: string;
  picturePath: string;
  text: string;
  type: 'TextBlockData';
}

interface PictureBlockData {
  isNowLoadingState: [0, 0];
  loadingSrc: string;
  pictureTitle: string;
  src: string;
  type: 'PictureBlockData';
}

type Block = TextBlockData | PictureBlockData;

interface StoryPoint {
  Latitude: number;
  Longitude: number;
  PointName: string;
  RepresentativeImagePath: string;
  enAddress: string;
  koAddress: sstring;
  blocks: Block[];
}

interface StoryContents {
  interactive: {
    pages: unknown[];
  };
  intro: {
    blocks: Block[];
  };
  storyPoints: StoryPoint[];
}
