import axios from './axiosClient';

/**
 *
 * @param params
 * iduser: number // 스토리 작성자의 iduser
 * lastIdBlog: string // 첫 페이지 -1 이후 마지막 스토리의 idblog
 * orderType: number // 1: 작성일 순, 2: 수정일 순
 *
 * @returns
 */
export const getStoryListByUserId = (params: any) =>
  axios.post('/getUserStoryList', { ...params }).then((res) => res.data);

export const getComments = () =>
  axios
    .get(
      'https://gist.githubusercontent.com/Ndream-KimYoungHoo/5d26a6aada64ec259546ad3d31a20834/raw/aa24cbb3b961ac51d7970f0f24320d75e5e4d170/gistfile2.json'
    )
    .then((res) => res.data);

export const getStoryRecommendation = () =>
  axios
    .get(
      'https://gist.githubusercontent.com/Ndream-KimYoungHoo/58a617c64f4d8a7cd6ac78bf936e5855/raw/4bae1a105b6db6c8c98117acf363f19c17069867/gistfile1.json'
    )
    .then((res) => res.data.StoryListData.data);
