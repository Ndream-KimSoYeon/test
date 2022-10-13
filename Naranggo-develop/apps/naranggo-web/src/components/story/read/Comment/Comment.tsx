import { Dispatch, RefObject, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getComments } from '@/api/story';
import CommentList from './CommentList';

interface CommentProps {
  selectedCommentToReply: SelectedCommentToReply | null;
  onLayoutCommentList: Dispatch<RefObject<HTMLDivElement>>;
  onReplyComment: Dispatch<SelectedCommentToReply>;
}

interface Result {
  [key: string]: CommentWithChild | { childComments: CommentWithId[] };
}

const Comment = ({
  onLayoutCommentList,
  selectedCommentToReply,
  onReplyComment
}: CommentProps) => {
  const { data, isLoading, error } = useQuery('comments', getComments);
  const [comments, setComments] = useState<CommentWithChild[]>([]);
  const [activeComment, setActiveComment] = useState<ActiveComment | null>(
    null
  );

  // todo : api 통신 구현시 로직 제대로 구현 예정
  useEffect(() => {
    data && !comments.length && setComments(getCommentsWithChild(data.data));
  }, [data, comments]);

  useEffect(() => {
    !selectedCommentToReply && setActiveComment(null);
  }, [selectedCommentToReply]);

  if (isLoading || error) {
    return <></>;
  }

  // todo : api 통신 구현시 로직 제대로 구현 예정
  const handleEditComment = (
    edittedComment: string,
    targetCommentId: string
  ) => {
    const newData = data.data.map((commentData: Comment) => {
      const { idreply, idrereply, userid } = commentData;

      return {
        ...commentData,
        commentId: `${idreply}-${idrereply}-${userid}`
      };
    });

    const targetCommentIndex = newData.findIndex(
      ({ commentId }: CommentWithId) => commentId === targetCommentId
    );

    newData[targetCommentIndex].contents = edittedComment;

    setComments(getCommentsWithChild(newData));
  };

  // todo : api 통신 구현시 로직 제대로 구현 예정
  const handleRemoveComment = (targetCommentId: string) => {
    const newData = data.data.map((commentData: Comment) => {
      const { idreply, idrereply, userid } = commentData;

      return {
        ...commentData,
        commentId: `${idreply}-${idrereply}-${userid}`
      };
    });

    const filteredData = newData.filter(
      ({ commentId }: CommentWithId) => commentId !== targetCommentId
    );

    setComments(getCommentsWithChild(filteredData));
  };

  return (
    <CommentList
      comments={comments}
      activeComment={activeComment}
      onLayoutCommentList={onLayoutCommentList}
      onActivateComment={setActiveComment}
      onEditComment={handleEditComment}
      onRemoveComment={handleRemoveComment}
      onReplyComment={onReplyComment}
    />
  );
};

export default Comment;

const getCommentsWithChild = (comments: Comment[]) =>
  Object.values(
    comments.reduce((result: Result, currentComment: Comment) => {
      const { idreply, idrereply, userid } = currentComment;
      const newComment = {
        ...currentComment,
        commentId: `${idreply}-${idrereply}-${userid}`
      };

      if (
        isTopLevelComment(idrereply) &&
        !isTopLevelCommentAlreadyVisited(result, idreply)
      ) {
        result[idreply] = {
          ...newComment,
          childComments: []
        };
        return result;
      }

      if (
        isTopLevelComment(idrereply) &&
        isTopLevelCommentAlreadyVisited(result, idreply)
      ) {
        result[idreply] = { ...newComment, ...result.idreply };
        return result;
      }

      if (
        !isTopLevelComment(idrereply) &&
        !isTopLevelCommentAlreadyVisited(result, idreply)
      ) {
        result[idreply] = { childComments: [newComment] };
        return result;
      }

      if (
        !isTopLevelComment(idrereply) &&
        isTopLevelCommentAlreadyVisited(result, idreply)
      ) {
        result[idreply].childComments.push(newComment);
        return result;
      }

      return result;
    }, {})
  ) as CommentWithChild[];

const isTopLevelComment = (idrereply: string) => +idrereply === 0;

const isTopLevelCommentAlreadyVisited = (result: Result, idreply: number) =>
  idreply in result;
