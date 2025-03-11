import { Link, Outlet, Route, Routes } from "react-router"
import { HomePage } from "./pages/Home"
import { ShopPage } from "./pages/Shop"
import { ProductPage } from "./pages/Product"
import { Link as UiLink, AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import { useEffect } from "react"
import { fetchProducts } from "./api/products"
import { useStore } from "./states/store"
import { Cart } from "./components/Cart"

function App() {
  const setProducts = useStore(state => state.setProducts);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="shop" element={<ShopPage />}></Route>
          <Route path="product/:id" element={<ProductPage />}></Route>
        </Route>
      </Routes>
    </>
  )
}

function Layout() {
  // Importera state funktionen som öppnar varukorgen
  const setCartOpen = useStore(state => state.setCartOpen);

  return <>
    <header>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, gap: 2, display: { xs: 'none', md: 'flex' } }}>
              <UiLink href="/" color="inherit">Home</UiLink>
              <UiLink href="/shop" color="inherit">Shop</UiLink>
              <Button onClick={() => setCartOpen(true)} color="inherit">
                Cart
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>

    <main>
      <Outlet />
      <Cart />
    </main>

    <footer>Footer</footer>
  </>;
}

export default App