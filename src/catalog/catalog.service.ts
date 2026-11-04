import {
  ConflictException, Injectable, NotFoundException, UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import type { Product } from './product.js';

@Injectable()
export class CatalogService {
  private readonly products = new Map<string, Product>();

  create(dto: CreateProductDto): Product {
    if (this.products.has(dto.sku)) throw new ConflictException('SKU ya existe'); // 409
    const product: Product = {
      sku: dto.sku,
      name: dto.name,
      description: dto.description,
      price: dto.price,
      currency: dto.currency,
      stock: dto.stock,
      status: 'borrador',
    };
    this.products.set(dto.sku, product);
    return product;
  }

  findBySku(sku: string): Product {
    const product = this.products.get(sku);
    if (!product) throw new NotFoundException(`Producto ${sku} no existe`); // 404
    return product;
  }

  list(page: number, limit: number): Product[] {
    return [...this.products.values()].slice((page - 1) * limit, page * limit);
  }

  publish(sku: string): Product {
    const product = this.findBySku(sku); // reutiliza el 404
    if (product.stock === 0) throw new UnprocessableEntityException('Sin stock no se publica'); // 422
    product.status = 'publicado';
    return product;
  }
}
