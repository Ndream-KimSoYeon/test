import FloatingBtn from '@/components/story/write/FloatingBtn';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import StoryWriteDroppablePointList from './StoryWriteDroppablePointList';
import StoryWriteDraggablePointListItem from './StoryWriteDraggablePointListItem';
import StoryWritePointListItem from './StoryWritePointListItem';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

import dynamic from 'next/dynamic';
import {
  Button,
  CircularProgress,
  Dialog,
  Stack,
  Typography
} from '@mui/material';
import CustomMarker from '@/components/common/map/CustomMarker';
import { reorder } from '@/utils/array';
import { DropResult } from 'react-beautiful-dnd';
import useUserPosition from '@/hooks/useUserPosition';
import GoogleMap from '@/components/common/map/GoogleMap';
import HeaderBack from '@/components/layout/HeaderBack';
import StoryWriteBtnGroup from './StoryWriteBtnGroup';
import StoryWritePreview from './StoryWritePreview';

const Editor = dynamic(
  () => import('@/components/story/write/StoryWriteEditor'),
  {
    ssr: false,
    loading: () => (
      <EditorWrapper>
        <CircularProgress />
      </EditorWrapper>
    )
  }
);

const StoryWrite = () => {
  const [pointList, setpointList] = useState<Point[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [centerCoordinate, setCenterCoordinate] = useState<MapCoordinate>();
  const [moveToCoordinate, setMoveToCoordinate] = useState<MapCoordinate>();
  const [editorValue, setEditorValue] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  const { userPosition } = useUserPosition();

  const handleClickFloatingBtn = () => {
    if (centerCoordinate) {
      setpointList([
        ...pointList,
        {
          ...centerCoordinate,
          id: Math.random(),
          title: '포인트 제목',
          address: '포인트 주소',
          representative: pointList.length === 0
        }
      ]);
    }
  };

  const handleCompleteStory = () => {
    // 작성할 포인트와 에디터 글 저장을 위해 데이터를 모아두는 곳
    // const params = {
    //   editorValue,
    //   ...selectedPoint
    // };

    setSelectedPoint(null);
  };

  const handleDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    const newPointList = reorder(
      pointList || [],
      source.index,
      destination.index
    );
    setpointList(newPointList);
  };

  const resetStory = () => {
    setpointList([]);
  };

  return (
    <Dialog fullScreen open={true} disableEnforceFocus>
      <HeaderBack pageName="스토리 제작" />
      <Wrapper className="story_write">
        <MapWrapper>
          {userPosition && (
            <GoogleMap
              center={moveToCoordinate || userPosition}
              onChangeMap={(mapChangeInformation: MapChangeInformation) => {
                setCenterCoordinate(mapChangeInformation.center);
              }}
            >
              {pointList.map(({ id, lat, lng }: Point) => (
                <CustomMarker
                  key={id}
                  lat={lat}
                  lng={lng}
                  numberOfMarkers={1}
                  representative=""
                />
              ))}
            </GoogleMap>
          )}
          <FloatingBtn onClickFloatingBtn={handleClickFloatingBtn} />
        </MapWrapper>
        <PointListWrapper>
          {pointList.length === 0 ? (
            <EmptyBox>
              <AddLocationWrapper>
                <AddLocationIcon />
              </AddLocationWrapper>
              <EmptyText color="gray">
                버튼을 눌러 포인트를 추가해보세요!
              </EmptyText>
            </EmptyBox>
          ) : (
            <StoryWriteDroppablePointList onDragEnd={handleDragEnd}>
              {pointList.map((point: Point, index: number) => (
                <StoryWriteDraggablePointListItem
                  key={point.id}
                  point={point}
                  index={index}
                  onClickEditPoint={(point: Point) => {
                    setSelectedPoint(point);
                  }}
                  onClickRemovePoint={(point: Point) => {
                    setpointList(
                      pointList.filter((p: Point) => p.id !== point.id)
                    );
                  }}
                  onClickRepresentative={(point: Point) => {
                    setpointList(
                      pointList.map((p: Point) => ({
                        ...p,
                        representative: p.id === point.id
                      }))
                    );
                  }}
                  onClickMovePoint={({ lat, lng }: Point) => {
                    if (lat && lng) {
                      setMoveToCoordinate({ lat, lng });
                    }
                  }}
                />
              ))}
            </StoryWriteDroppablePointList>
          )}
        </PointListWrapper>
        <ToolbarWrapper>
          <StoryWriteBtnGroup
            hasStory={pointList.length > 0}
            resetStory={resetStory}
            goPreview={() => setIsPreview(true)}
          />
        </ToolbarWrapper>
        <Dialog
          fullScreen
          open={selectedPoint !== null}
          onClose={() => {
            setSelectedPoint(null);
          }}
        >
          <Box>
            <HeaderBack
              onClickBack={() => {
                setSelectedPoint(null);
              }}
              pageName="포인트 제작"
            />
            {selectedPoint && <StoryWritePointListItem point={selectedPoint} />}
            <Editor onChange={setEditorValue} value={editorValue} />
            <CompleteButton onClick={handleCompleteStory}>
              작성완료
            </CompleteButton>
          </Box>
        </Dialog>
        <Dialog fullScreen open={isPreview}>
          <HeaderBack
            onClickBack={() => {
              setIsPreview(false);
            }}
            pageName="스토리 미리보기"
          />
          <StoryWritePreview pointList={pointList} />
        </Dialog>
      </Wrapper>
    </Dialog>
  );
};

export default StoryWrite;

const Wrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: '100%',
  height: '100%'
}));

const CompleteButton = styled(Button)(() => ({
  width: '100%',
  height: '3.5rem'
}));

const EditorWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%'
}));

const AddLocationWrapper = styled(Stack)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
  height: '3rem',
  width: '3rem',
  background: 'rgba(4, 146, 194, 0.8);',
  borderRadius: '50%'
}));

const AddLocationIcon = styled(AddLocationAltIcon)(() => ({
  color: 'rgba(255, 255, 255, 1)'
}));

const MapWrapper = styled(Stack)(() => ({
  width: '100%',
  maxHeight: '500px',
  flex: '1 1 100%',
  position: 'relative'
}));

const PointListWrapper = styled(Stack)(() => ({
  width: '100%',
  height: '300px',
  flex: '1 1 300px',
  maxHeight: '300px'
}));

const ToolbarWrapper = styled(Stack)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 'auto',
  width: '100%'
}));

const EmptyBox = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center'
}));

const EmptyText = styled(Typography)(() => ({
  marginLeft: '1rem'
}));
