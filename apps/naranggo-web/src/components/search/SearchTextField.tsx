import ArrowBack from '@mui/icons-material/ArrowBack';
import Search from '@mui/icons-material/Search';
import { IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';

interface SearchTextFieldProps {
  onClickSearch: () => void;
  searchPlaceholder?: string;
  searchData?: string;
  onChangeSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchTextField = ({
  onClickSearch,
  searchPlaceholder,
  onChangeSearch,
  searchData
}: SearchTextFieldProps) => {
  return (
    <TextField
      id="input-with-icon-textfield"
      placeholder={searchPlaceholder}
      onChange={onChangeSearch}
      value={searchData}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              aria-label="goback"
              onClick={() => {
                window.history.back();
              }}
            >
              <ArrowBack />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              type="submit"
              aria-label="goback"
              onClick={onClickSearch}
            >
              <Search />
            </IconButton>
          </InputAdornment>
        ),
        style: { height: 50 }
      }}
      variant="standard"
    />
  );
};

export default SearchTextField;
