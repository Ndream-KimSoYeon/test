import { Box } from '@mui/material';

import { Draggable } from 'react-beautiful-dnd';
import StoryWritePointListItem from './StoryWritePointListItem';

interface StoryWriteDraggablePointListItemProps {
  point: Point;
  index: number;
  onClickEditPoint?: (point: Point) => void;
  onClickRemovePoint?: (point: Point) => void;
  onClickRepresentative?: (point: Point) => void;
  onClickMovePoint?: (point: Point) => void;
}

const StoryWriteDraggablePointListItem = ({
  point,
  index,
  onClickEditPoint,
  onClickRemovePoint,
  onClickRepresentative,
  onClickMovePoint
}: StoryWriteDraggablePointListItemProps) => {
  const designateAsRepresentative = () => {
    onClickRepresentative && onClickRepresentative(point);
  };

  const movePoint = () => {
    onClickMovePoint && onClickMovePoint(point);
  };

  const removePoint = () => {
    onClickRemovePoint && onClickRemovePoint(point);
  };

  return (
    <Draggable draggableId={String(point.id)} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <StoryWritePointListItem
            point={point}
            onClickEditPoint={onClickEditPoint}
            onClickRemovePoint={removePoint}
            onClickMovePoint={movePoint}
            onClickRepresentative={designateAsRepresentative}
          />
        </Box>
      )}
    </Draggable>
  );
};

export default StoryWriteDraggablePointListItem;
