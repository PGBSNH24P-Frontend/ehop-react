import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "react-router";

export function ProductListItem({ product }) {
    return <Link to={"/product/" + product.id} style={{ textDecoration: "none" }}>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {product.category}
                </Typography>
                <img width="90%" src={product.thumbnail} />
                <Typography variant="h5" component="div">
                    {product.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    {product.brand}
                </Typography>
                <Typography variant="body2">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card></Link>
}