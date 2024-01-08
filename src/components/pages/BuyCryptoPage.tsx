import { Grid } from '@mui/material';
import ProvidersList from '../../components/ProvidersList'

export default function BuyCryptoPage() {
    return (
        <div>
            <Grid container justifyContent={"center"}>
                <ProvidersList />
            </Grid>
        </div>
    );
}