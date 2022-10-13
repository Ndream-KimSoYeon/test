import { useRef, useEffect, useState, useCallback } from 'react';
import { styled, Box } from '@mui/material';
import { CommonStyles } from '@/components/common/style/CommonStyles';
import helpers from '@/utils/helpers';

interface CommentWriteProps {
  selectedCommentToReply: SelectedCommentToReply | null;
  commentWriteRef: React.RefObject<HTMLFormElement>;
  onCancleReplyComment: React.Dispatch<null>;
  onChangeCommentWriteElementHeight: React.Dispatch<number>;
}

const CommentWrite = ({
  commentWriteRef,
  selectedCommentToReply,
  onCancleReplyComment,
  onChangeCommentWriteElementHeight
}: CommentWriteProps) => {
  // todo: 로직 구현시 구현 예정
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [writtenComment, setWrittenComment] = useState('');
  const commentInputAreaRef = useRef<HTMLDivElement>(null);

  const updateCommentWriteHeight = useCallback(() => {
    const commentWriteElementHeight = commentWriteRef.current?.clientHeight;

    helpers.isNil(commentWriteElementHeight) &&
      onChangeCommentWriteElementHeight(commentWriteElementHeight);
  }, [commentWriteRef, onChangeCommentWriteElementHeight]);

  // CommentWrite 컴포넌트에 글을 작성할 때 높이가 변하는데, 변할때 마다 상태를 업데이트 시켜줌
  // 그렇지 않으면 scrollToTopBtn의 위치가 CommentWrite 컴포넌트를 가릴 수 있음
  useEffect(
    () => updateCommentWriteHeight(),
    [updateCommentWriteHeight, commentWriteRef.current?.clientHeight]
  );

  useEffect(() => {
    selectedCommentToReply && commentInputAreaRef.current?.focus();
  }, [selectedCommentToReply, commentInputAreaRef]);

  const handleInputUserComment = ({
    currentTarget
  }: React.FormEvent<HTMLDivElement>) =>
    setWrittenComment(currentTarget.innerText);

  const handleCancleReplyComment = () => {
    onCancleReplyComment(null);

    if (commentInputAreaRef.current) {
      commentInputAreaRef.current.innerText = '';
    }

    updateCommentWriteHeight();
  };

  return (
    <Wrapper ref={commentWriteRef}>
      <CommentWriteAreaWrapper>
        <CommentWriteContentEditable
          ref={commentInputAreaRef}
          contentEditable
          placeholder={'댓글을 입력해주세요 :)'}
          onBlur={handleCancleReplyComment}
          onInput={handleInputUserComment}
        />
        <SubmitBtn type="button">등록</SubmitBtn>
      </CommentWriteAreaWrapper>
      {selectedCommentToReply && (
        <ReplyingText>
          <strong>{selectedCommentToReply.nickname}</strong>에게 답글 다는 중 ㆍ
          <CancleReplyCommentBtn
            type="button"
            onClick={handleCancleReplyComment}
          >
            취소
          </CancleReplyCommentBtn>
        </ReplyingText>
      )}
    </Wrapper>
  );
};

export default CommentWrite;

const Wrapper = styled('form')(({ theme }) => ({
  width: '100vw',
  padding: '6px',
  display: 'flex',
  position: 'fixed',
  bottom: 0,
  zIndex: 1,
  borderTop: `0.2rem solid ${theme.palette.custom.grey200}`,
  backgroundColor: theme.palette.custom.light,
  flexDirection: 'column-reverse'
}));

const CommentWriteAreaWrapper = styled(Box)(() => ({
  position: 'relative'
}));

const CommentWriteContentEditable = styled(CommonStyles.ContentEditable)(
  ({ theme }) => ({
    borderRadius: '16px',
    backgroundColor: theme.palette.custom.grey2,
    fontSize: '1rem',
    maxHeight: '6rem',
    overflowY: 'scroll',
    padding: '6px 12px',
    flex: 1
  })
);

const SubmitBtn = styled('button')(({ theme }) => ({
  padding: 0,
  border: 'none',
  position: 'absolute',
  top: '50%',
  right: '16px',
  transform: 'translate(0, -50%)',
  height: '100%',
  fontWeight: 'bold',
  color: theme.palette.custom.blue,
  backgroundColor: 'transparent',
  fontSize: '1rem',
  cursor: 'pointer'
}));

const ReplyingText = styled(Box)(() => ({
  marginBottom: '6px',
  display: 'flex',
  alignItems: 'center'
}));

const CancleReplyCommentBtn = styled('button')(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'none',
  color: theme.palette.custom.grey3,
  cursor: 'pointer'
}));
