import { styled, Box, Menu, MenuItem } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import helpers from '@/utils/helpers';
import { RefObject, useState } from 'react';
import useSendMessageToDevice from '@/hooks/useSendMessageToDevice';
import TwoOptionsModal from '@/components/common/Modal/TwoOptionsModal';
import { CommonStyles } from '@/components/common/style/CommonStyles';
import useSnackBarStore from '@/store/useSnackBarStore';

type OptionHeaderProps =
  | Pick<StoryReadData, 'likecount' | 'replycountsum'> & {
      commentListRef?: RefObject<HTMLDivElement> | null;
      onClickScrollToCommentSection?: () => void;
      heightPx?: string;
    };

const OptionHeader = ({
  likecount,
  replycountsum,
  commentListRef,
  onClickScrollToCommentSection,
  heightPx
}: OptionHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const setIsSnackBarOpen = useSnackBarStore(
    (state) => state.setIsSnackBarOpen
  );
  const setSnackBarMessage = useSnackBarStore(
    (state) => state.setSnackBarMessage
  );
  const [isReportModalDisplayed, setIsReportModalDisplayed] = useState(false);
  const sendMessage = useSendMessageToDevice();

  const handleScrollToCommentBtn = () => {
    onClickScrollToCommentSection && onClickScrollToCommentSection();
    commentListRef && helpers.scrollIntoView(commentListRef);
  };

  const handleClickMoreBtn = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleCloseMenu = () => setAnchorEl(null);

  const handleClickCopyLinkBtn = () => {
    navigator.clipboard.writeText(window.location.href);
    sendMessage('COPY', window.location.href);
    setIsSnackBarOpen(true);
    setSnackBarMessage('링크가 복사되었습니다.');
    setAnchorEl(null);
  };

  // todo: 스크랩 기능 구현
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleClickScrapBtn = () => {};

  const handleShowReportModal = () => {
    setIsReportModalDisplayed(true);
    setAnchorEl(null);
  };

  // todo: 신고하는 로직 추가
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleClickLeftBtn = () => {};

  const handleClickRightBtn = () => setIsReportModalDisplayed(false);

  return (
    <>
      <Wrapper sx={{ height: heightPx ? heightPx : '15%' }}>
        <Btn>
          <Icon as={Favorite} />
          <Text>좋아요 {likecount}</Text>
        </Btn>
        <Btn onClick={handleScrollToCommentBtn}>
          <Icon as={ChatBubbleIcon} />
          <Text>댓글 {replycountsum}</Text>
        </Btn>
        <Btn onClick={handleClickMoreBtn}>
          <Icon as={MoreHorizIcon} />
          <Text>더보기</Text>
        </Btn>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          {/* todo: 사용자인 경우, 링크복사, 수정, 삭제만 존재함 */}
          <MenuItem onClick={handleClickScrapBtn}>스크랩</MenuItem>
          {commentListRef && (
            <MenuItem onClick={handleClickCopyLinkBtn}>링크복사</MenuItem>
          )}
          <MenuItem onClick={handleShowReportModal}>신고</MenuItem>
        </Menu>
      </Wrapper>
      {/* todo: 신고로직 작성하기. 신고한 후 snackbar 띄우기 */}
      <TwoOptionsModal
        isModalOpen={isReportModalDisplayed}
        leftBtnName="신고하기"
        rightBtnName="취소하기"
        onCloseModal={handleClickRightBtn}
        onClickLeftBtn={handleClickLeftBtn}
        onClickRightBtn={handleClickRightBtn}
      >
        <ReportWrapper>
          <MailInput placeholder="E-mail 주소를 입력해주세요" />
          <ReportContentEditable
            contentEditable
            placeholder="메세지를 입력해주세요"
          />
        </ReportWrapper>
      </TwoOptionsModal>
    </>
  );
};

export default OptionHeader;

const Wrapper = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  color: 'white'
}));

const Text = styled('span')(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.custom.grey
}));

const Btn = styled('button')(() => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  justifyContent: 'center',
  width: '100%',
  border: 'none'
}));

const Icon = styled('template')<{ isLike?: boolean }>(({ theme, isLike }) => ({
  fontSize: '1.2rem',
  paddingRight: '0.2em',
  color: isLike ? 'red' : theme.palette.custom.grey
}));

const ReportWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '80vw'
}));

const MailInput = styled('input')(() => ({
  width: '100%',
  padding: '0.3rem',
  borderRadius: '6px',
  fontSize: '1rem',
  border: '1px solid',
  '&:focus': {
    outline: 'none'
  }
}));

const ReportContentEditable = styled(CommonStyles.ContentEditable)(() => ({
  width: '100%',
  height: '40vh',
  padding: '0.3rem',
  margin: '1rem 0',
  fontSize: '1rem',
  border: '1px solid',
  borderRadius: '6px',
  overflowY: 'scroll'
}));
