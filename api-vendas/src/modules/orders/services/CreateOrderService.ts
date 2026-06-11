import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrderRepository";
import ProductRepository from "@modules/products/typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id : string;
    products : IProduct[];
}

export default class CreateOrderService{
    public async execute({customer_id, products} : IRequest): Promise<Order>{
        const ordersRepository = new OrdersRepository();
        const customerRepository = new CustomersRepository();
        const productsRepository = new ProductRepository();

        const customerExists = await customerRepository.findById(customer_id);
        if(!customerExists){
            throw new AppError("Could not find any customer with given id");
        }

        const existsProducts = await productsRepository.findAllById(products);
        if(!existsProducts.length){
            throw new AppError("Could not find any products with the given ids.")
        }

        const existsProductsIds = existsProducts.map((product) => product.id);
        const checkInexistentProducts = products.filter(
            (product) => !existsProductsIds.includes(product.id)
        );
        if(!checkInexistentProducts.length){
            throw new AppError(`Could not find product ${checkInexistentProducts[0]!.id}`);
        }

        const quantityUnavailable = products.filter(
            (product) => existsProducts.find(
                (p) => p.id === product.id!
            )!.quantity < product.quantity
        );

        if(quantityUnavailable.length){
            throw new AppError(
                `The quantity ${quantityUnavailable[0]!.quantity} is not available for ${quantityUnavailable[0]!.id}`
            );
        }
        const serializedProducts = products.map((product) => ({
            product_id : product.id,
            quantity : product.quantity,
            price: existsProducts.find((p) => p.id === product.id)!.price
        }));

        const order = await ordersRepository.createOrder({
            customer : customerExists,
            products: serializedProducts
        })

        const {orders_products} = order;
        const updateProducts = existsProducts.map((product) => {
            const orderedProduct = orders_products.find(
                (orderProduct) => orderProduct.product.id === product.id
            );
            if(orderedProduct){
                product.quantity -= orderedProduct.quantity;
            }
            return product;
        });
        await productsRepository.save(updateProducts);
        return order;
    }
}