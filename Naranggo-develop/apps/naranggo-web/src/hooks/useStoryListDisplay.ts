import { useCallback, useState } from 'react';
import useSortList, { SortedType } from './useSortList';

const BUTTON_TYPE = ['최신순', '좋아요순', '거리순'];

const SORT_TYPE: SortedType<StoryItem>[] = [
  { key: 'createdtime', direction: 'desc' },
  { key: 'likecount', direction: 'desc' },
  { key: 'distance', direction: 'asc' }
];

const useStoryListDisplay = (storyList: StoryItem[]) => {
  const { sortedList, sorting } = useSortList<StoryItem>(storyList);
  const [btnText, setBtnText] = useState(BUTTON_TYPE[0]);

  const changeStoryList = useCallback(
    (btnType: string) => {
      switch (btnType) {
        case BUTTON_TYPE[0]:
          sorting(SORT_TYPE[0].key, SORT_TYPE[0].direction);
          break;
        case BUTTON_TYPE[1]:
          sorting(SORT_TYPE[1].key, SORT_TYPE[1].direction);
          break;
        case BUTTON_TYPE[2]:
          sorting(SORT_TYPE[2].key, SORT_TYPE[2].direction);
          break;
        default:
      }
    },
    [sorting]
  );

  const changeSortBtnText = (btnType: string) => {
    switch (btnType) {
      case BUTTON_TYPE[0]:
        sorting(SORT_TYPE[1].key, SORT_TYPE[1].direction);
        setBtnText(BUTTON_TYPE[1]);
        break;
      case BUTTON_TYPE[1]:
        sorting(SORT_TYPE[2].key, SORT_TYPE[2].direction);
        setBtnText(BUTTON_TYPE[2]);
        break;
      case BUTTON_TYPE[2]:
        sorting(SORT_TYPE[0].key, SORT_TYPE[0].direction);
        setBtnText(BUTTON_TYPE[0]);
        break;
      default:
    }
  };

  return { sortedList, changeStoryList, btnText, changeSortBtnText };
};

export default useStoryListDisplay;
