import { POINT_LIST_ITEM_HEIGHT } from '@/consts/constants';
import {
  Box,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  styled
} from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import CreateIcon from '@mui/icons-material/Create';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarIcon from '@mui/icons-material/Star';

import { useState } from 'react';

interface StoryWritePointListItemProps {
  point: Point;
  onClickEditPoint?: (point: Point) => void;
  onClickRemovePoint?: (point: Point) => void;
  onClickRepresentative?: (point: Point) => void;
  onClickMovePoint?: (point: Point) => void;
}

const StoryWritePointListItem = ({
  point,
  onClickEditPoint,
  onClickRemovePoint,
  onClickRepresentative,
  onClickMovePoint
}: StoryWritePointListItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const designateAsRepresentative = () => {
    onClickRepresentative && onClickRepresentative(point);
    handleClose();
  };

  const movePoint = () => {
    onClickMovePoint && onClickMovePoint(point);
    handleClose();
  };

  const removePoint = () => {
    onClickRemovePoint && onClickRemovePoint(point);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <PointItemWrapper>
        <ListItemAvatar>
          {point.representative && <StarIcon />}
          <LocationIcon />
        </ListItemAvatar>
        <ListItemText primary={point.title} secondary={point.address} />
        {onClickEditPoint ? (
          <PointItemButtonGroup>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <MenuItem onClick={designateAsRepresentative}>
                대표 포인트 지정
              </MenuItem>
              <MenuItem onClick={movePoint}>포인트로 이동</MenuItem>
              <MenuItem onClick={removePoint}>삭제</MenuItem>
            </Menu>
            <PointItemButton
              onClick={() => onClickEditPoint && onClickEditPoint(point)}
            >
              <CreateIcon />
            </PointItemButton>
            <PointItemButton onClick={handleClickMore}>
              <MoreHorizIcon />
            </PointItemButton>
          </PointItemButtonGroup>
        ) : (
          <></>
        )}
      </PointItemWrapper>
      <Divider />
    </>
  );
};

const PointItemWrapper = styled(ListItem)(() => ({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: POINT_LIST_ITEM_HEIGHT,
  padding: '1rem'
}));

const PointItemButtonGroup = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}));

const PointItemButton = styled(Button)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}));

const LocationIcon = styled(AddLocationIcon)(() => ({
  fontSize: '2.5rem',
  fill: 'rgba(4, 146, 194, 0.8);'
}));

export default StoryWritePointListItem;
