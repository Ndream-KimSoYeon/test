import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography
} from '@mui/material';
import theme from '@/utils/theme';
import React from 'react';

interface FilterListProps {
  title: string;
  filterList: FilterItem[];
  setFilterList: (list: FilterItem[]) => void;
}

const FilterList = ({ title, filterList, setFilterList }: FilterListProps) => {
  const handleChangeCheck = (clickedId: number) => {
    setFilterList(
      filterList.map(({ text, id, checked }) => ({
        text,
        id,
        checked: clickedId === id ? !checked : checked
      }))
    );
  };

  return (
    <List>
      <ListTitle>{title}</ListTitle>
      {filterList.map(({ text, id, checked }) => {
        return (
          <StorySet
            key={text}
            secondaryAction={
              <CheckBox
                edge="end"
                checked={checked}
                onChange={() => handleChangeCheck(id)}
              />
            }
          >
            <StorySetText primary={text} />
          </StorySet>
        );
      })}
    </List>
  );
};

export default React.memo(FilterList);

const ListTitle = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '1.2rem'
}));

const StorySet = styled(ListItem)(() => ({
  padding: '0.3rem'
}));

const StorySetText = styled(ListItemText)(() => ({
  padding: '0.5rem'
}));

const CheckBox = styled(Checkbox)(() => ({
  color: theme.palette.custom.yellow,
  '& .MuiSvgIcon-root': { fontSize: '1.7rem' },
  '&.Mui-checked': {
    color: theme.palette.custom.yellow
  }
}));
