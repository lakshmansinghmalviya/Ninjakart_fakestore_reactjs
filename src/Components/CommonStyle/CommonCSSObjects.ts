export const scrollableModel = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '400px',
  maxHeight: '98vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  p: 3,
  borderRadius: 2,
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

export const buttonAsText = {
  textTransform: 'none',
  fontSize: '12px',
  p: '0px',
  // ml: '-10px'
}