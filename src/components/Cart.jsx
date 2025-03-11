import { Box, Button, Container, Drawer, Typography } from "@mui/material";
import { useStore } from "../states/store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartItem } from "./CartItem";

export function Cart() {
    const open = useStore(state => state.cartOpen);
    const setCartOpen = useStore(state => state.setCartOpen);
    // Hämta varukorg produkter för rendering
    const cart = useStore(state => state.cart);
    const clearCart = useStore(state => state.clearCart);

    return (
        <>
            <Drawer anchor="right" open={open} onClose={() => setCartOpen(false)}>
                <Container maxWidth="md">
                    <Box
                        sx={{
                            width: "400px",
                            p: 2,
                        }}
                    >
                        <Box display="flex" justifyContent="right">
                            <Button variant="contained" onClick={() => setCartOpen(false)}>
                                Close
                            </Button>
                        </Box>
                        <Container>
                            {cart.length === 0 ? (
                                <EmptyCart />
                            ) : (
                                <>
                                    <Box>{cart.map(item => <CartItem cartItem={item} />)}</Box>
                                    <Button variant="contained" onClick={() => clearCart()}>
                                        Clear Cart
                                    </Button>{" "}
                                </>
                            )}
                        </Container>
                    </Box>
                </Container>
            </Drawer>
        </>
    );
}

export const EmptyCart = ({ onBrowse }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="50vh"
            color="gray"
            textAlign="center"
        >
            <ShoppingCartIcon sx={{ fontSize: 80, color: "gray", mb: 2 }} />
            <Typography variant="h5">Your cart is empty</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
                Add some products to start shopping.
            </Typography>
            <Button variant="contained" color="primary" onClick={onBrowse}>
                Browse Products
            </Button>
        </Box>
    );
};