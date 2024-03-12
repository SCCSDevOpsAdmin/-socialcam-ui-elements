export class ProductService {
    getProducts() {
        return fetch('./products.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
