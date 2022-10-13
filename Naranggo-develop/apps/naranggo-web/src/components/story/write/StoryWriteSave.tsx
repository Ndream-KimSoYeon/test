import TwoOptionsModal from '@/components/common/Modal/TwoOptionsModal';
import HeaderBack from '@/components/layout/HeaderBack';
import {
  Stack,
  Dialog,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Box,
  styled
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import StoryWriteLoad from './StoryWriteLoad';

interface StorySaveFormInput {
  storyName: string;
  representativeImage: string;
  storyDescription: string;
  representativePoint: string;
}

const StoryWriteSave = () => {
  const { control, handleSubmit } = useForm<StorySaveFormInput>();
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);

  const onSubmit: SubmitHandler<StorySaveFormInput> = (data) => {
    alert(data);
  };

  const handleClickRepresentativePoint = () => {
    setIsLoadModalOpen(true);
  };

  return (
    <SaveDialog fullScreen open={true}>
      <HeaderBack pageName="스토리 제작" />
      <ContentWrapper>
        <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <Content>
            <FormControl>
              <FormLabel id="storyDescription">스토리 제목</FormLabel>
              <Controller
                name="storyName"
                control={control}
                defaultValue="포인트 1"
                render={({ field }) => <TextField {...field} />}
              />
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                대표 이미지
              </FormLabel>
              <Controller
                name="representativeImage"
                control={control}
                render={({ field }) => (
                  <Button {...field}>
                    이미지 추가(api 나오면 맞춰서 개발)
                  </Button>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel id="storyDescription">스토리 설명</FormLabel>
              <Controller
                name="storyDescription"
                control={control}
                render={({ field }) => (
                  <TextField placeholder="내용을 입력하세요." {...field} />
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel id="representativePoint">대표 포인트</FormLabel>
              <Controller
                name="representativePoint"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Box>
                    포인트 1
                    <Button onClick={handleClickRepresentativePoint} {...field}>
                      변경하기
                    </Button>
                  </Box>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                공개 여부
              </FormLabel>
              <Controller
                name="representativeImage"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="public"
                      control={<Radio />}
                      label="공개"
                    />
                    <FormControlLabel
                      value="private"
                      control={<Radio />}
                      label="비공개"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                방문 여부
              </FormLabel>
              <Controller
                name="representativeImage"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="public"
                      control={<Radio />}
                      label="방문 후"
                    />
                    <FormControlLabel
                      value="private"
                      control={<Radio />}
                      label="방문 전"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            <Button sx={{ marginTop: 'auto' }} type="submit">
              저장하기
            </Button>
          </Content>
        </form>
      </ContentWrapper>
      <TwoOptionsModal
        widthPx="20rem"
        isModalOpen={isLoadModalOpen}
        onCloseModal={() => {
          setIsLoadModalOpen(false);
        }}
      >
        <StoryWriteLoad />
      </TwoOptionsModal>
    </SaveDialog>
  );
};

export default StoryWriteSave;

const SaveDialog = styled(Dialog)(() => ({
  height: '100%'
}));

const ContentWrapper = styled(Stack)(() => ({
  height: '100%',
  padding: '2rem'
}));

const Content = styled(Stack)(() => ({
  height: '100%'
}));
