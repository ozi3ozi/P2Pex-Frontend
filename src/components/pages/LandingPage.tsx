import * as React from 'react';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Link as LinkMui } from '@mui/material';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const Item = styled(Button)(({ theme }) => ({
  ...theme.typography.h5,
  // height: 40,
  width: 150,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  lineHeight: 3,
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
    <div>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              P2P decentralized To sell or buy crypto using fiat
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              BBuy Crypto with fiat 
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Become a provider to sell your crypto. Choose your own payment method in fiat (cash, interac, ...)
            </Typography>
            <LinkMui variant="h5" href="#">
              Docs
            </LinkMui>
          </Box>
        </Grid>
      </Grid>
      <Grid sx={{ flexGrow: 1 }} container m={2} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={3}>
            {["buy crypto with fiat", "Sell crypto for fiat"].map((value) => (
              <Grid key={value} m={4} item >
                <Link to={'/signup'} key={value} >
                  <Item >{value}</Item>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid> 
    </div>
    // <Link to={'/signup'} >Signup</Link>
     
    
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