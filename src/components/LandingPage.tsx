import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.h1,
  height: 640,
  width: 500,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  lineHeight: 6,
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const handleOnClick = () => {
  
};

export default function BasicGrid() {
  const [theme, setTheme] = React.useState(darkTheme);

  return (
    // <Card sx={{ maxWidth: 345 }}>
    //   <CardActionArea>
    //     <CardMedia
    //       component="img"
    //       height="140"
    //       image="/static/images/cards/contemplative-reptile.jpg"
    //       alt="become a provideer"
    //     />
    //     <CardContent>
    //       <Typography gutterBottom variant="h5" component="div">
    //         become a provideer
    //       </Typography>
    //       <Typography variant="body2" color="text.secondary">
    //         Lizards are a widespread group of squamate reptiles, with over 6,000
    //         species, ranging across all continents except Antarctica
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     <Button size="small" color="primary">
    //       Share
    //     </Button>
    //   </CardActions>
    // </Card>

    <Grid sx={{ flexGrow: 1 }} container m={2} spacing={2}>
      <ThemeProvider theme={darkTheme}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={3}>
            {["Provider", "Receiver"].map((value) => (
              <Grid key={value} m={2} item component={Button} onClick={handleOnClick}>
                <Item elevation={16}>{value}</Item>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </ThemeProvider>
      
    </Grid>
    
    // <Box sx={{ flexGrow: 1 }}>
    //   <Grid container spacing={2}>
    //     <Grid item xs={6} height={100}>
    //       <Item>Crypto provider</Item>
    //     </Grid>
    //     <Grid item xs={6} height={100}>
    //       <Item>Receiver</Item>
    //     </Grid>
    //   </Grid>
    // </Box>
  );
}