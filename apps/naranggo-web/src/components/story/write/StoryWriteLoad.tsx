import SelectList from '@/components/common/list/SelectList';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import { useState } from 'react';
import { Stack, Typography } from '@mui/material';

const StoryWriteLoad = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <SelectList>
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <ListItemIcon>
          <NoPhotographyIcon />
        </ListItemIcon>
        <Stack>
          <Typography>포인트 1</Typography>
          <Typography>2022년 9월 7일 방문전</Typography>
          <Typography>최근 수정 2022년 9월 6일</Typography>
        </Stack>
      </ListItemButton>
      <Divider />
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <NoPhotographyIcon />
        </ListItemIcon>
        <Stack>
          <Typography>포인트 2</Typography>
          <Typography>2022년 9월 6일 방문전</Typography>
          <Typography>최근 수정 2022년 9월 7일</Typography>
        </Stack>
      </ListItemButton>
      <Divider />
    </SelectList>
  );
};

export default StoryWriteLoad;
