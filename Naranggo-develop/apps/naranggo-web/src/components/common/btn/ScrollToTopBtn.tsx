import { styled, IconButton } from '@mui/material';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import helpers from '@/utils/helpers';

interface ScrollToTpBtnProps {
  isScrollToTopBtnDisplayed: boolean;
  onClickScrollToTopBtn: () => void;
  marginBetweenBottom?: number;
}

const ADDITIONAL_MARGIN = 20;

const ScrollToTopBtn = ({
  isScrollToTopBtnDisplayed,
  onClickScrollToTopBtn,
  marginBetweenBottom
}: ScrollToTpBtnProps) => {
  return (
    <>
      {isScrollToTopBtnDisplayed && (
        <Wrapper
          onClick={onClickScrollToTopBtn}
          marginBetweenBottom={marginBetweenBottom}
        >
          <ArrowUpward />
        </Wrapper>
      )}
    </>
  );
};

export default ScrollToTopBtn;

const Wrapper = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'marginBetweenBottom'
})<{ marginBetweenBottom?: number }>(({ marginBetweenBottom, theme }) => ({
  position: 'fixed',
  bottom:
    (marginBetweenBottom &&
      helpers.convertPxToRem(marginBetweenBottom + ADDITIONAL_MARGIN)) ||
    '1rem',
  right: '1.5rem',
  zIndex: 100,
  backgroundColor: theme.palette.custom.light,
  '&:hover': {
    backgroundColor: theme.palette.custom.light
  },
  boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.2)'
}));
