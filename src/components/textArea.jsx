import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields({text, settext })

{
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
                  id="outlined-multiline-flexible"
                  label="Say Hi!!!🤝"
                  multiline
                  maxRows={2}
                  onChange={(e) => {settext(e.target.value);}}
                  value={text}
        />
      </div>
    </Box>
  );
}