const PROFILE_IMAGE_URL = 'https://resources-cf.naranggo.com/profiles/';

// 원본 이미지를 중간 사이즈로 리사이징한 이미지
const THUMBNAILS50_IMAGE_URL =
  'https://resources-cf.naranggo.com/thumbnails50/';

// 원본 이미지를 작은 사이즈로 리사이징한 이미지
const THUMBNAILS_IMAGE_URL = 'https://resources-cf.naranggo.com/thumbnails/';

export const POINT_PIN_NOIMAGE_URL = '/images/gps_point_pin.png';
export const SEARCH_POINT_PIN_IMAGE_URL = '/images/gps_point_pin_writing.png';

export const getMarkerImage = (representative: string) => {
  if (representative === '') {
    return representative;
  }

  // 한국 관광공사인 경우
  if (representative.startsWith('/')) {
    return '/images/korea_tour.jpg';
  }

  return THUMBNAILS_IMAGE_URL + representative;
};

export const getStoryImage = (type: string, path: string) => {
  if (type === 'profile') {
    return PROFILE_IMAGE_URL + path;
  }

  if (type === 'thumbnails50') {
    return THUMBNAILS50_IMAGE_URL + path;
  }

  return path;
};

export const getPointImage = (representative: string) => {
  return THUMBNAILS_IMAGE_URL + representative;
};
