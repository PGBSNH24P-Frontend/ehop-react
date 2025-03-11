import { useParams } from "react-router";
import { useStore } from "../states/store";
import { Box, Button, Container, FormControl, Grid2 as Grid, ImageList, ImageListItem, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { useState } from "react";

export function ProductPage() {
    const [activeImage, setActiveImage] = useState(0);
    const [size, setSize] = useState("small");

    // Importera state funktionen som lägger till produkter i varukorgen
    const addCartItem = useStore(state => state.addCartItem);

    const params = useParams();
    const products = useStore(state => state.products);

    const id = Number.parseInt(params.id);

    const product = products.find(product => product.id === id);

    if (product === undefined) {
        return <>No such product exists.</>;
    }

    const activeImageUrl = product.images[activeImage];

    return <section>
        <Container maxWidth="md">
            <Paper elevation={1}>
                <Grid container spacing={2}>
                    <Grid size={2}>
                        <ImageList cols={1} rowHeight={164}>
                            {product.images.map((image, index) => (
                                <ImageListItem key={image} sx={{ border: activeImage === index ? "1px solid black" : "none" }}>
                                    <img
                                        onClick={() => setActiveImage(index)}
                                        srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${image}?w=164&h=164&fit=crop&auto=format`}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                    <Grid size={4}>
                        <img
                            width="100%"
                            srcSet={`${activeImageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${activeImageUrl}?w=164&h=164&fit=crop&auto=format`}
                        />
                    </Grid>
                    <Grid size={6}>
                        <Box>
                            <Typography variant="h5">
                                {product.title}
                            </Typography>
                            <Typography variant="body2">
                                {product.description}
                            </Typography>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={size}
                                    label="Size"
                                    onChange={event => setSize(event.target.value)}
                                >
                                    <MenuItem value={"large"}>Large</MenuItem>
                                    <MenuItem value={"medium"}>Medium</MenuItem>
                                    <MenuItem value={"small"}>Small</MenuItem>
                                </Select>
                            </FormControl>

                            <Button variant="contained"
                                onClick={() => addCartItem(product)}
                            >Add to Cart</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    </section>;
}