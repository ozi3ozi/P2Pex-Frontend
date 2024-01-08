import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {CurrencyExchangeBox, CurrencyExchangeBoxProps, BaseCurrencySelectListProps, CryptoSelectList, FiatSelectList} from '../components/SwapBox';
import { Grid, InputLabel, TextField } from '@mui/material';
// import currenciesList from './json/currenciesList.json';

interface Filter {
    name: string;
    isAvailable: boolean;
    paymentMethod: string;
    byCrypto: string;
    byFiat: string;
}

function createProvider(name: string, isAvailable: boolean, paymentMethods: string[], currTradedTokens: string[][]) {
    return {
        name,
        isAvailable,
        paymentMethods,
        currTradedTokens,
        getAcceptedFiat: () => paymentMethods.map((method) =>method.split('**')[1].split(' ')).flat(),
        getAcceptedCrypto: () => currTradedTokens.map((token) => token[0]),
        getPaymentMethods: () => paymentMethods.map((method) => method.split('**')[0]),
    }
}

const providersList = [
    createProvider("p1", true, ["GooPay**USD CAD**myEmail@example", "SamPay**YEN GBP**myEmail@example"], [["BTC", "20"], ["ETH", "30"]]),
    createProvider("p2", true, ["GooPay**USD CAD**p2@example", "SamPay**YEN GBP**p2@example"], [["BTC", "30"], ["ADA", "30"]]),
    createProvider("p3", true, ["GooPay**USD MAD**p3@example", "SamPay**YEN GBP**p3@example"], [["BTC", "40"], ["LINK", "30"]]),
    createProvider("p4", false, ["GooPay**USD AUD CAD**p4@example", "SamPay**JPY GBP**p4@example"], [["BTC", "50"], ["BCH", "30"]]),
    createProvider("p5", false, ["GooPay**USD CAD EUR**p5@example", "SamPay**JPY GBP**p5@example"], [["BTC", "60"], ["LITE", "30"]]),
]

const getCurrencyFilter = (usedCurrencies: string[] | string[][]) => {
    const uniqueTokens = [...new Set(usedCurrencies.map((token) => Array.isArray(token) ? token[0] : (token as string).split('**')[1].split(' ')))];
    console.log(uniqueTokens);
    return uniqueTokens.flat();
}

export default function ProvidersList() {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [filter, setFilter] = React.useState<Filter>({
        name: '',
        isAvailable: true,
        paymentMethod: '',
        byCrypto: '',
        byFiat: '',
    });

    console.log(`crypto: ${filter.isAvailable && filter.byCrypto}`);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
        };

    const handleCryptoFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({...filter, byCrypto: event.target.value} as Filter);
    };

    const handleFiatFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({...filter, byFiat: event.target.value} as Filter);
    };
    
    const filteredProviders = providersList.filter((provider) => 
        !filter.byCrypto || provider.getAcceptedCrypto().includes(filter.byCrypto)
        ).filter((provider) => 
        !filter.byFiat || provider.getAcceptedFiat().includes(filter.byFiat)
    );

    const cryptoListProps = {
        selectedVal:filter.byCrypto,
        isMultiSelect: false,
        filter:[],
        handleCurrencyChange: handleCryptoFilterChange
    }
    const fiatSelectListProps = {
        selectedVal:filter.byFiat,
        isMultiSelect: false,
        filter:[],
        handleCurrencyChange: handleFiatFilterChange
    }
    const currencyExchangeBoxProps = {
        filter: [],
        selectedCrypto: filter.byCrypto,
        selectedFiat: filter.byFiat,
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={2} minWidth={'120px'}>
                    <CryptoSelectList {...cryptoListProps as BaseCurrencySelectListProps} />
                    <InputLabel>
                        Crypto to buy
                    </InputLabel>
                </Grid>
                <Grid item xs={2} minWidth={'120px'}>
                    <FiatSelectList {...fiatSelectListProps as BaseCurrencySelectListProps} />
                    <InputLabel>
                        Fiat to sell
                    </InputLabel>
                </Grid>
            </Grid>
        {filteredProviders.map((provider) => (
            <Accordion key={provider.name} expanded={expanded === provider.name} onChange={handleChange(provider.name)}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${provider.name}-content"`}
                id={`${provider.name}-header`}
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {provider.name}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    Payment methods: {provider.paymentMethods.map((method) => method.split("**", 2).join('(').concat(')')).join(', ')}
                    <br/>Available: {provider.getAcceptedCrypto().join(', ')}    
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container >
                        <Grid key={`${provider.name}-info`} item xs={7}>
                                {provider.currTradedTokens.map((token) => (
                                    <Typography key={`${provider.name}.${token[0]}`}>{token[0]} - {token[1]}</Typography>
                                ))}
                                {provider.paymentMethods.map((paymentMethod, index) => (
                                    <Typography key={index}>{paymentMethod}</Typography>
                                ))}
                        </Grid>
                        <Grid key={`${provider.name}-swapbox`} item xs={5}>
                            <CurrencyExchangeBox {...{...currencyExchangeBoxProps, filter: provider.getAcceptedCrypto().concat(provider.getAcceptedFiat())} as CurrencyExchangeBoxProps} />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        ))}    
        </div>
    );
}
