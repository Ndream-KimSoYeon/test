interface OfficialStoryData {
  baekje: OfficialItemData[];
  koreaIndependence: OfficialItemData[];
  officialStoryList: OfficialItemData[];
}

interface OfficialItemData {
  idblog: number;
  image: string;
  name: string;
  summary: string;
  isfinished: number;
  estimatedtime: number;
  lastmodifiedtime: string;
  likecount: number;
  replycountsum: number;
  isLike: boolean;
}
