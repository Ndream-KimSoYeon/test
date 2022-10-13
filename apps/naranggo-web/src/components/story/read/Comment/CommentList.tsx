import CommentItem from './CommentItem';
import { styled, Box, Typography } from '@mui/material';
import { Dispatch, RefObject, useEffect, useRef } from 'react';

interface CommentListProps {
  comments: CommentWithChild[];
  activeComment: ActiveComment | null;
  onLayoutCommentList: Dispatch<RefObject<HTMLDivElement>>;
  onEditComment: (edittedComment: string, targetCommentId: string) => void;
  onRemoveComment: (targetCommentId: string) => void;
  onActivateComment: React.Dispatch<ActiveComment | null>;
  onReplyComment: React.Dispatch<SelectedCommentToReply>;
}

const CommentList = ({
  comments,
  activeComment,
  onLayoutCommentList,
  onEditComment,
  onRemoveComment,
  onActivateComment,
  onReplyComment
}: CommentListProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onLayoutCommentList(ref);
  }, [onLayoutCommentList]);

  return (
    <Wrapper ref={ref}>
      <NumberOfCommentsWrapper>
        <NumberOfComments>댓글 {comments.length}개</NumberOfComments>
      </NumberOfCommentsWrapper>
      {comments.map((comment: CommentWithChild) => (
        <CommentItem
          key={comment.commentId}
          comment={comment}
          activeComment={activeComment}
          onEditComment={onEditComment}
          onRemoveComment={onRemoveComment}
          onActivateComment={onActivateComment}
          onReplyComment={onReplyComment}
        />
      ))}
    </Wrapper>
  );
};

export default CommentList;

const Wrapper = styled(Box)(() => ({
  padding: '1rem'
}));

const NumberOfCommentsWrapper = styled(Box)(() => ({
  marginBottom: '1rem'
}));

const NumberOfComments = styled(Typography)(() => ({
  fontWeight: 'bold'
}));
