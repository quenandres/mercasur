import type { CreateProductDto } from './dto/create-product.dto.js';

export type ProductStatus = 'borrador' | 'publicado';
export type Product = CreateProductDto & { status: ProductStatus };
