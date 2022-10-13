import { styled } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddIcon from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import helpers from '@/utils/helpers';

interface MapBtnProps {
  btnType:
    | 'MapType'
    | 'UserLocation'
    | 'ZoomIn'
    | 'ZoomOut'
    | 'Expand'
    | 'Shrink';
  onClickBtn: () => void;
  isMapTypeSatellite?: boolean;
  style?: Pick<
    React.CSSProperties,
    'position' | 'top' | 'bottom' | 'left' | 'right' | 'margin'
  >;
}

const MapBtn = ({
  btnType,
  isMapTypeSatellite,
  style,
  onClickBtn
}: MapBtnProps) => {
  const btnTypeToComponent: {
    [key in MapBtnProps['btnType']]: React.ReactElement;
  } = {
    'MapType': <EarthIcon isMapTypeSatellite={isMapTypeSatellite} />,
    'UserLocation': <Icon as={MyLocationIcon} />,
    'ZoomIn': <Icon as={AddIcon} />,
    'ZoomOut': <Icon as={Remove} />,
    'Expand': <Icon as={KeyboardArrowDownIcon} />,
    'Shrink': <Icon as={KeyboardArrowUpIcon} />
  };

  return (
    <StyledBtn onClick={onClickBtn} style={style}>
      {btnTypeToComponent[btnType]}
    </StyledBtn>
  );
};

export default MapBtn;

const StyledBtn = styled('button')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: '3px',
  padding: 0,
  backgroundColor: theme.palette.custom.light,
  cursor: 'pointer'
}));

const EarthIcon = styled(
  PublicIcon,
  helpers.shouldNotForwardProp('isMapTypeSatellite')
)<{ isMapTypeSatellite?: boolean }>(({ theme, isMapTypeSatellite }) => ({
  fontSize: '1.6rem',
  margin: '0.2rem',
  color: isMapTypeSatellite
    ? theme.palette.custom.dark
    : theme.palette.custom.grey
}));

const Icon = styled('template')(() => ({
  fontSize: '1.6rem',
  margin: '0.2rem'
}));
