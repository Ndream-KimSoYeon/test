import { List } from '@mui/material';
import { styled, SxProps } from '@mui/material/styles';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

interface StoryWriteDroppablePointListProps {
  children: React.ReactNode;
  onDragEnd: (result: DropResult) => void;
  sx?: SxProps;
}

const StoryWriteDroppablePointList = ({
  children,
  onDragEnd,
  sx
}: StoryWriteDroppablePointListProps) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable-list">
      {(provided) => (
        <Wrapper sx={sx} ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </Wrapper>
      )}
    </Droppable>
  </DragDropContext>
);
export default StoryWriteDroppablePointList;

const Wrapper = styled(List)(() => ({
  // position: 'absolute',
  bgcolor: 'background.paper',
  height: '100%',
  width: '100%',
  overflowY: 'scroll'
}));
