import { OutlinedInput, styled, TextField } from '@mui/material'

const StyledInputSelect = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: '10px',
  margin: 15,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor:
      theme.palette.mode === 'dark' ? '#6ea0d9' : 'rgba(0, 0, 0, 0.23)'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#367bc9'
  },
  '&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
    borderColor: '#6ea0d9'
  }
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: 15,
  '& label': {
    color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0, 0, 0, 0.7)'
  },
  '& label.Mui-focused': {
    color: '#6ea0d9'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#6ea0d9'
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    '& fieldset': {
      borderColor:
        theme.palette.mode === 'dark' ? '#6ea0d9' : 'rgba(0, 0, 0, 0.23)'
    },
    '&:hover fieldset': {
      borderColor: '#367bc9'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6ea0d9'
    },
    '&.Mui-disabled': {
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.23)' : '#f0f0f0'
    }
  }
}))

export { StyledInputSelect, StyledTextField }