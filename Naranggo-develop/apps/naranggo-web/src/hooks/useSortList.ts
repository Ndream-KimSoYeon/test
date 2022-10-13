import { useCallback, useState } from 'react';

const SortingDirectionEnum = {
  ASC: 'asc',
  DESC: 'desc'
} as const;

type SortingDirectionType =
  typeof SortingDirectionEnum[keyof typeof SortingDirectionEnum];

export type SortedType<T> = { key: keyof T; direction: 'asc' | 'desc' };

interface useSortListType<T> {
  sortedList: T[];
  sorting: (key: keyof T, direction: SortingDirectionType) => void;
}

const useSortList = <T>(
  list: Record<keyof T, T[keyof T]>[]
): useSortListType<T> => {
  const [sortedList, setSortedList] =
    useState<Record<keyof T, T[keyof T]>[]>(list);

  const sorting = useCallback(
    (key: keyof T, direction: SortingDirectionType) => {
      const sorted = list.sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      });

      setSortedList(sorted);
    },
    [list]
  );

  return { sortedList: sortedList as T[], sorting };
};

export default useSortList;
