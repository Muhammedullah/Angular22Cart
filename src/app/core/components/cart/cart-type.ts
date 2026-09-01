import { Product } from '@app/pages/products/product';

export interface CartType extends Product {
	quantity: number;
}