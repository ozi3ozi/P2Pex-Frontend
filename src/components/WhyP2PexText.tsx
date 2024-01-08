import { Box, Grid, Paper, Typography } from "@mui/material";

export default function WhyP2PexText() {
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 3 },
                            pr: { md: 0 },
                        }}
                        >
                            <Typography variant="h5" color="inherit" paragraph>
                                0% exchange rate fees
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                0.1% transaction fees
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                Get your money's worth
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}