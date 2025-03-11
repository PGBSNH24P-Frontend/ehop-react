import { Box, Container, Grid2 as Grid, Typography } from "@mui/material";
import { useStore } from "../states/store";
import { ProductListItem } from "../components/ProductListItem";

export function HomePage() {
    const products = useStore(state => state.products);

    return <section>
        <Container maxWidth="md">
            <Box>
                <Grid container spacing={2}>
                    <Grid>
                        <Box>
                            <Typography variant="h1" sx={{ fontSize: 25 }}>
                                See everything with Clarity
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid>
                        <img width="400px" src="https://salinaka-ecommerce.web.app/images/banner-girl.789f1fa6f451ad26c5039fcbc049ace7.png" />
                    </Grid>
                </Grid>
            </Box>

            <Box>
                <Grid container spacing={2} >
                    {products.map(product => <Grid size={4}><ProductListItem product={product} /></Grid>)}
                </Grid>
            </Box>
        </Container>
    </section>;
}