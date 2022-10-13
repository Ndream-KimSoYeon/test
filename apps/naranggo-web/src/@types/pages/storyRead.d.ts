interface TextBlockDataWtihKey extends TextBlockData {
  blockId: string;
}

interface PictureBlockDataWithKey extends PictureBlockData {
  blockId: string;
}

type BlockWithKey = TextBlockDataWtihKey | PictureBlockDataWithKey;

interface CommentWithId extends Comment {
  commentId: string;
}

interface CommentWithChild extends CommentWithId {
  childComments: CommentWithId[];
}

type SelectedCommentToReply = Pick<CommentWithId, 'commentId' | 'nickname'>;

interface ActiveComment {
  commentId: string;
  type: 'Editing' | 'Replying';
  priorText?: string;
}

type StoryPointWithBlockKey = Omit<StoryPoint, 'blocks'> & {
  blocks: BlockWithKey[];
};

type StoryPointInformation = {
  scrollYPosition: number;
  storyPointNodeHeight: number;
} & MapCoordinate;

interface MarkerToStoryPointInformation {
  [key: string]: StoryPointInformation;
}

interface ScrollPositionInformation {
  mainImageVisibility: number;
  commentListSectionPosition: number;
}
