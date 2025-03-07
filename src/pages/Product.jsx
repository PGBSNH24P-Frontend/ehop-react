import { useParams } from "react-router";
import { useStore } from "../states/store";

export function ProductPage() {
    const params = useParams();
    const products = useStore(state => state.products);

    const id = Number.parseInt(params.id);

    const product = products.find(product => product.id === id);

    if (product === undefined) {
        return <>No such product exists.</>;
    }

    return <>{product.title}</>;
}