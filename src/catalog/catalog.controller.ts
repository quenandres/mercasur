import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';

@Controller('products') // la ruta es /products aunque el módulo se llame catalog
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.catalog.create(dto);
  }

  @Get(':sku')
  get(@Param('sku') sku: string) {
    return this.catalog.findBySku(sku);
  }

  @Get()
  list(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.catalog.list(page, limit);
  }

  @Patch(':sku/publish')
  publish(@Param('sku') sku: string) {
    return this.catalog.publish(sku);
  }
}
