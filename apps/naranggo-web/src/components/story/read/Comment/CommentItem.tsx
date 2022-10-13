import { useState, useRef } from 'react';
import { styled, Box, Avatar, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PATH from '@/consts/paths';
import dayjs from 'dayjs';
import TwoOptionsModal from '@/components/common/Modal/TwoOptionsModal';
import useWebToAppMessage from '@/hooks/useWebToAppMessage';
import CommentContent from './CommentContent';
import useSnackBarStore from '@/store/useSnackBarStore';
import { useRouter } from 'next/router';

interface CommentItemProps {
  comment: CommentWithChild | CommentWithId;
  activeComment: ActiveComment | null;
  onEditComment: (edittedComment: string, targetCommentId: string) => void;
  onActivateComment: React.Dispatch<ActiveComment | null>;
  onRemoveComment: (targetCommentId: string) => void;
  onReplyComment: React.Dispatch<SelectedCommentToReply>;
}

const CommentItem = ({
  comment,
  activeComment,
  onEditComment,
  onActivateComment,
  onRemoveComment,
  onReplyComment
}: CommentItemProps) => {
  const { contents, nickname, profilepath, reg_date, commentId } = comment;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [writtenComment, setWrittenComment] = useState(contents);
  const setIsSnackBarOpen = useSnackBarStore(
    (state) => state.setIsSnackBarOpen
  );
  const setSnackBarMessage = useSnackBarStore(
    (state) => state.setSnackBarMessage
  );
  const sendMessage = useWebToAppMessage();
  const contentAreaRef = useRef<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const isEditing =
    activeComment &&
    activeComment.commentId === commentId &&
    activeComment.type === 'Editing';

  const isReplying =
    activeComment &&
    activeComment.commentId === commentId &&
    activeComment.type === 'Replying';

  // 더보기 버튼 클릭시
  const handleClickMoreBtn = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClickCommentEditBtnInMenu = () => {
    setAnchorEl(null);
    onActivateComment({
      commentId,
      type: 'Editing',
      priorText: contents
    });
  };

  const handleClickCommentRemoveBtnInMenu = () => setIsModalOpen(true);

  const handleClickCommentCopyBtnInMenu = () => {
    setAnchorEl(null);
    navigator.clipboard.writeText(contents);
    sendMessage('COPY', contents);
    setIsSnackBarOpen(true);
    setSnackBarMessage('댓글이 복사되었습니다.');
  };

  const handleClickCommentRemoveBtnInModal = () => {
    setIsModalOpen(false);
    setAnchorEl(null);
    onRemoveComment(commentId);
  };

  const handleInputUserComment = ({
    currentTarget
  }: React.FormEvent<HTMLDivElement>) =>
    setWrittenComment(currentTarget.innerText);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleCloseMenu = () => setAnchorEl(null);

  const handleClickCommentEditCancleBtn = () => {
    if (contentAreaRef.current) {
      contentAreaRef.current.innerText = contents;
    }

    onActivateComment(null);
  };

  const handleClickCommentUpdateBtn = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    onEditComment(writtenComment, commentId);
    onActivateComment(null);
  };

  const handleClickReplyComment = () => {
    onReplyComment({ nickname, commentId });
    onActivateComment({
      commentId: commentId,
      type: 'Replying'
    });
  };

  // todo : 프로필 클릭시 프로필 페이지 라우팅
  const handleClickProfileBtn = () => router.push('/profile/userid');

  return (
    <>
      <ParentCommentWrapper>
        <LeftWrapper onClick={handleClickProfileBtn}>
          <Avatar
            src={profilepath && `${PATH.PROFILE + profilepath}`}
            alt={`${nickname} 유저 프로필 이미지`}
          />
        </LeftWrapper>
        <RightWrapper>
          <TopWrapper>
            <Nickname>{nickname}</Nickname>
            <IconButton onClick={handleClickMoreBtn}>
              <MoreBtnIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
              <MenuItem onClick={handleClickCommentCopyBtnInMenu}>
                복사
              </MenuItem>
              <MenuItem onClick={handleClickCommentRemoveBtnInMenu}>
                삭제
              </MenuItem>
              <MenuItem onClick={handleClickCommentEditBtnInMenu}>
                수정
              </MenuItem>
            </Menu>
          </TopWrapper>
          <MiddleWrapper>
            <CommentContent
              isEditing={isEditing}
              isReplying={isReplying}
              contentAreaRef={contentAreaRef}
              contents={contents}
              onInputUserComment={handleInputUserComment}
              onClickCommentUpdateBtn={handleClickCommentUpdateBtn}
              onClickCommentEditCancleBtn={handleClickCommentEditCancleBtn}
            />
          </MiddleWrapper>
          <BottomWrapper>
            <CommentDate>
              {`${dayjs(reg_date).format('YYYY년 MM월 DD일')}`}
            </CommentDate>
            <ReplyBtn onClick={handleClickReplyComment}>답글달기</ReplyBtn>
          </BottomWrapper>
        </RightWrapper>
      </ParentCommentWrapper>
      <TwoOptionsModal
        isModalOpen={isModalOpen}
        onCloseModal={handleCloseModal}
        onClickLeftBtn={handleClickCommentRemoveBtnInModal}
        onClickRightBtn={handleCloseModal}
        leftBtnName="삭제"
        rightBtnName="취소"
      >
        <ModalChildrenWrapper>댓글을 삭제 하시겠습니까?</ModalChildrenWrapper>
      </TwoOptionsModal>
      {hasChildComments(comment) && (
        <ChildCommentListWrapper>
          <ChildCommentWrapper>
            {comment.childComments.map((childComment: CommentWithId) => (
              <CommentItem
                key={childComment.commentId}
                comment={childComment}
                activeComment={activeComment}
                onEditComment={onEditComment}
                onActivateComment={onActivateComment}
                onRemoveComment={onRemoveComment}
                onReplyComment={onReplyComment}
              />
            ))}
          </ChildCommentWrapper>
        </ChildCommentListWrapper>
      )}
    </>
  );
};

export default CommentItem;

const ParentCommentWrapper = styled('li')(() => ({
  listStyle: 'none',
  display: 'flex',
  alignItems: 'start',
  marginBottom: '1rem'
}));

const ChildCommentListWrapper = styled('li')(() => ({
  listStyle: 'none'
}));

const ChildCommentWrapper = styled('ul')(() => ({
  margin: 0
}));

const LeftWrapper = styled(IconButton)(() => ({}));

const RightWrapper = styled(Box)(() => ({
  width: '100%',
  marginLeft: '1rem'
}));

const TopWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative'
}));

const Nickname = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: '0.8rem'
}));

const MoreBtnIcon = styled(MoreHorizIcon)(({ theme }) => ({
  color: theme.palette.custom.grey4,
  fontSize: '1rem'
}));

const MiddleWrapper = styled(Box)(() => ({}));

const BottomWrapper = styled(Box)(() => ({
  marginTop: '0.4rem',
  display: 'flex',
  padding: 0
}));

const CommentDate = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  color: theme.palette.custom.grey
}));

const ReplyBtn = styled('button')(({ theme }) => ({
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  padding: 0,
  fontSize: '0.8rem',
  fontWeight: 'bold',
  marginLeft: '1rem',
  color: theme.palette.custom.grey
}));

const ModalChildrenWrapper = styled(Box)(() => ({
  width: '14em',
  height: '6em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const hasChildComments = (
  comment: CommentWithChild | Comment
): comment is CommentWithChild =>
  'childComments' in (comment as CommentWithChild);
