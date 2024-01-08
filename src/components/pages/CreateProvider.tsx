import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormHelperText, InputLabel } from '@mui/material';
import { BaseCurrencySelectListProps, 
  CryptoSelectList, 
  FiatSelectList} from '../SwapBox';



function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
  const [paymentMethodsCount, setValue] = React.useState(1);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="user-name"
                name="userName"
                required
                fullWidth
                id="userName"
                label="User Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="method-name" id="my-helper-text" sx={{ mb: 1 }}>Payment Methods:</InputLabel>
              <Grid container spacing={2} pl={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="method-name"
                    name="methodName"
                    required
                    fullWidth
                    id="methodName"
                    label="eg: GooglePay, Interac, Bank transfer, ..."
                    autoFocus
                  />
                </Grid>
                <Grid item xs={2} minWidth={'120px'}>
                    <FiatSelectList {...{...{selectedVal: , isMultiSelect: true, filter: [], handleCurrencyChange: () => {}}} as BaseCurrencySelectListProps} />
                    <InputLabel>
                        Fiat to sell
                    </InputLabel>
                </Grid>
              </Grid>
              <Button variant="contained" color="primary" onClick={() => setValue(paymentMethodsCount + 1)}>Add Another Payment Method</Button>
              {paymentMethodsCount > 1 && (
                <Button variant="contained" color="primary" onClick={() => setValue(1)}>Remove Payment Method</Button>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
    
  );
}

const aPaymentMethod = <TextField
  fullWidth
  id="email"
  label="Email Address"
  name="email"
  autoComplete="email"
  />
function paymentMethods(paymentMethodsCount: number) {
  let paymentMethods: JSX.Element[] = [];
  for (let index = 0; index < paymentMethodsCount; index++) {
    paymentMethods.push(<TextField
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
    />);
    
  }
  return 
}