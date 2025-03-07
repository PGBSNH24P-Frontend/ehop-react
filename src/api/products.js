export async function fetchProducts() {
    const response = await fetch('https://dummyjson.com/products');

    const json = await response.json();
    return json.products;
}