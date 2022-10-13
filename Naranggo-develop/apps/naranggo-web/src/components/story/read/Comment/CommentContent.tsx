import { RefObject, FormEvent, MouseEvent } from 'react';
import { styled, Box } from '@mui/material';

interface CommentContentProps {
  isEditing: boolean | null;
  isReplying: boolean | null;
  contentAreaRef: RefObject<HTMLDivElement>;
  contents: string;
  onInputUserComment: ({ currentTarget }: FormEvent<HTMLDivElement>) => void;
  onClickCommentUpdateBtn: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickCommentEditCancleBtn: () => void;
}

const CommentContent = ({
  isEditing,
  isReplying,
  contentAreaRef,
  contents,
  onInputUserComment,
  onClickCommentUpdateBtn,
  onClickCommentEditCancleBtn
}: CommentContentProps) => {
  const renderContentDependOnCommentActiveType = () => {
    if (isEditing) {
      return (
        <>
          <Content
            as={EditingContent}
            ref={contentAreaRef}
            contentEditable
            suppressContentEditableWarning={true}
            onInput={onInputUserComment}
          >
            {contents}
          </Content>
          <BtnWrapper>
            <UpdateBtn onClick={onClickCommentUpdateBtn}>업데이트</UpdateBtn>
            <CancleBtn onClick={onClickCommentEditCancleBtn}>취소</CancleBtn>
          </BtnWrapper>
        </>
      );
    }

    if (isReplying) {
      return <Content as={ReplyingContent}>{contents}</Content>;
    }

    return <Content onInput={onInputUserComment}>{contents}</Content>;
  };

  return <>{renderContentDependOnCommentActiveType()}</>;
};

export default CommentContent;

const BtnWrapper = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row-reverse',
  marginTop: '10px'
}));

const UpdateBtn = styled('button')(({ theme }) => ({
  borderRadius: '6px',
  fontSize: '0.8rem',
  padding: '0.4em 0.6em',
  color: 'white',
  cursor: 'pointer',
  backgroundColor: theme.palette.custom.blue,
  border: `1px solid ${theme.palette.custom.blue}`
}));

const CancleBtn = styled('button')(() => ({
  display: 'flex',
  borderRadius: '6px',
  marginRight: '1rem',
  padding: '0.4em 0.6em',
  border: '1px solid black',
  color: 'black',
  backgroundColor: 'transparent',
  cursor: 'pointer'
}));

const Content = styled('div')(() => ({
  width: '100%',
  fontSize: '0.8rem',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  wordWrap: 'break-word'
}));

const EditingContent = styled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: '6px',
  padding: '8px',
  outline: `1px solid ${theme.palette.custom.grey}`
}));

const ReplyingContent = styled('div')(({ theme }) => ({
  padding: '8px',
  borderRadius: '6px',
  backgroundColor: theme.palette.custom.grey200
}));
