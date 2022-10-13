import { Avatar, Stack, styled, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from 'dayjs';

interface AlertListProps {
  alertItems: AlertItem[];
  setAlertItems: (alertItems: AlertItem[]) => void;
}

const AlertList = ({ alertItems, setAlertItems }: AlertListProps) => {
  const handleRemoveAlarmItem = (idalert: number) => {
    setAlertItems(alertItems.filter((item) => item.idalert !== idalert));
  };

  const getMessage = (
    division: number,
    from_nickname: string,
    blogtitle: string
  ) => {
    switch (division) {
      case 0:
        return {
          text: `${from_nickname}님이 `,
          subText: `${blogtitle}글을 썼어요.`
        };
      case 1:
        return {
          text: `${from_nickname}님이 `,
          subText: `${blogtitle}글에 댓글을 남겼어요.`
        };
      case 2:
        return {
          text: `${from_nickname}님이 당신을 팔로잉 했습니다.`,
          subText: ''
        };
      case 3:
        return {
          text: `${from_nickname}님도 `,
          subText: `${blogtitle}글에 댓글을 남겼어요.`
        };
      case 4:
        return {
          text: `${from_nickname}님도 `,
          subText: `${blogtitle}글에 대댓글을 남겼어요.`
        };
      default:
        return { text: '', subText: '' };
    }
  };

  return (
    <Wrapper>
      {alertItems.map((alertList: AlertItem) => {
        const {
          from_profilepath,
          from_nickname,
          blogtitle,
          reg_date,
          division,
          idalert
        } = alertList;

        const { text, subText } = getMessage(
          division,
          from_nickname,
          blogtitle
        );

        return (
          <AlerListWrapper key={idalert}>
            <StyledAvatar
              alt={from_nickname}
              src={`https://resources-cf.naranggo.com/profiles/${from_profilepath}`}
            />
            <TextWrapper>
              <Text variant="body1">{text}</Text>
              <Text variant="body1">{subText}</Text>
              <Stack>
                {dayjs(reg_date.split('T')[0]).format('YYYY[년] MM[월] DD[일]')}
              </Stack>
            </TextWrapper>
            <DeleteIcon onClick={() => handleRemoveAlarmItem(idalert)} />
          </AlerListWrapper>
        );
      })}
    </Wrapper>
  );
};
export default AlertList;

const Wrapper = styled(Stack)(() => ({
  padding: '0 .5rem',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

const AlerListWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  alignItems: 'center'
}));

const StyledAvatar = styled(Avatar)(() => ({
  marginRight: '.5rem'
}));

const TextWrapper = styled(Stack)(() => ({
  flex: 1,
  justifyContent: 'space-around',
  height: '4.5rem',
  marginTop: '.5rem'
}));

const Text = styled(Typography)(() => ({
  display: 'contents',
  fontSize: '0.875rem'
}));

const DeleteIcon = styled(ClearIcon)(() => ({
  width: '1.25rem',
  height: '1.25rem',
  margin: '.5rem',
  fontSize: '.875rem'
}));
