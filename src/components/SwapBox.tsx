// a react component using Material ui. the component is a currency exchange box.
// It has two input fields and a button to convert the amount of the first input field to the second input field.
import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, Container, Grid, SelectChangeEvent } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import { CurrencyBitcoin } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import currenciesList from './json/currenciesList.json';

const getChainlinkPriceFeedFor = () => {
  
}

export interface CurrencyExchangeBoxProps {
  filter: string[];
  selectedCrypto: string;
  selectedFiat: string;
}
export const CurrencyExchangeBox: React.FC<CurrencyExchangeBoxProps> = (props: CurrencyExchangeBoxProps) => {
  const [amount, setAmount] = useState(-1);
  const [convertedAmount, setConvertedAmount] = useState(-1);
  const [selectedFiat, setSelectedFiat] = useState(props.selectedFiat);
  const [selectedCrypto, setSelectedCrypto] = useState(props.selectedCrypto);

  const handleConvert = () => {
    // Perform the conversion logic here
    // Update the convertedAmount state with the converted value

    setConvertedAmount(amount * 2);
  };

  const handleFiatChange = (event: SelectChangeEvent<string>) => {
    setSelectedFiat(event.target.value);
  };

  const handleCryptoChange = (event: SelectChangeEvent<string>) => {
    setSelectedCrypto(event.target.value);
  };

  return (
    <div>
        <Grid container spacing={2}>
            <Grid item xs={7}>
                <TextField label="From" name='fiatAmount' id='fiatAmount' type='number' fullWidth
                    onChange={(e) => setAmount(parseFloat(e.target.value))} 
                    value={amount >= 0 ? amount : ''}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><FiatSelectList selectedVal={selectedFiat} isMultiSelect={false} filter={props.filter} handleCurrencyChange={handleFiatChange} /></InputAdornment>,
                      }}/>
            </Grid>
            <Grid item xs={7}>
                <TextField label="To" name='cryptoAmount' id='cryptoAmount' type='number' fullWidth 
                onChange={(e) => setConvertedAmount(parseFloat(e.target.value))} 
                value={convertedAmount >= 0 ? convertedAmount : ''}
                InputProps={{
                    endAdornment: <InputAdornment position="end"><CryptoSelectList selectedVal={selectedCrypto} isMultiSelect={false} filter={props.filter} handleCurrencyChange={handleCryptoChange} /></InputAdornment>,
                  }}/>
            </Grid>
            <Grid item xs={7}>
              <Button variant="contained" color="primary" onClick={handleConvert}>
                <AttachMoney />Convert
              </Button>
            </Grid>
        </Grid>
    </div>
  );
};

interface CurrencySelectListProps extends BaseCurrencySelectListProps {
  isFiatOrCrypto: string;
}

export interface BaseCurrencySelectListProps {
  selectedVal: string;
  isMultiSelect: boolean;
  filter: string[];
  handleCurrencyChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
}

const CurrencySelectList = ( props: CurrencySelectListProps ) => {
  let currencyList = Object.entries(props.isFiatOrCrypto === "crypto" ? 
    currenciesList.cryptoList : currenciesList.fiatList);
  if (props.filter.length > 0) {
    currencyList = currencyList.filter((currency) => props.filter.includes(currency[1].code));
  } 
  return (
    <Select
      labelId={`${props.isFiatOrCrypto}-select-label`}
      id={`${props.isFiatOrCrypto}-select`}
      value={props.selectedVal ? props.selectedVal : currencyList[0][1].code}
      label={props.isFiatOrCrypto}
      variant='standard'
      onChange={props.handleCurrencyChange}
      fullWidth
      {...props.isMultiSelect && { multiple: true }}
    >
      {currencyList.map((currency) => (
        <MenuItem key={currency[1].code} value={currency[1].code}>
          {`${currency[1].code}${currency[1].icon}`}
        </MenuItem>
      ))}
    </Select>
  );
};
export const CryptoSelectList: React.FC<BaseCurrencySelectListProps> = (props: BaseCurrencySelectListProps) => {
    return (
      <CurrencySelectList handleCurrencyChange={props.handleCurrencyChange} 
        isFiatOrCrypto='crypto' selectedVal={props.selectedVal} filter={props.filter} isMultiSelect={props.isMultiSelect} />
    );
}

export const FiatSelectList: React.FC<BaseCurrencySelectListProps> = (props: BaseCurrencySelectListProps) => {
    return (
      <CurrencySelectList handleCurrencyChange={props.handleCurrencyChange} 
        isFiatOrCrypto='fiat' selectedVal={props.selectedVal} filter={props.filter} isMultiSelect={props.isMultiSelect} />
    );
}


// const currenciesList = {
//     "fiatList": {
//         "USD": {
//             "code": "USD",
//             "icon" : "🇺🇸"
//         },
//         "JPY": {
//             "code": "JPY",
//             "icon" : "🇯🇵"
//         },
//         "AUD": {
//             "code": "AUD",
//             "icon" : "🇦🇺"
//         },
//         "CHF": {
//             "code": "CHF",
//             "icon" : "🇨🇭"
//         },
//         "SGD": {
//             "code": "SGD",
//             "icon" : "🇸🇬"
//         },
//         "MXN": {
//             "code": "MXN",
//             "icon" : "🇲🇽"
//         },
//         "BRL": {
//             "code": "BRL",
//             "icon" : "🇧🇷"
//         },
//         "GBP": {
//             "code": "GBP",
//             "icon" : "🇬🇧"
//         }
//     },
//     "cryptoList": {
//         "BTC": {
//             "code": "BTC",
//             "icon" : "🏴‍☠"
//         },
//         "ETH": {
//             "code": "ETH",
//             "icon" : "🌴"
//         },
//         "LINK": {
//             "code": "LINK",
//             "icon" : "🔗"
//         },
//         "ADA": {
//             "code": "ADA",
//             "icon" : "🦺"
//         }
//     }
// }