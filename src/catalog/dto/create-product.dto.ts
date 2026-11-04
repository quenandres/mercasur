import { IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString() @IsNotEmpty() sku!: string;
  @IsString() @IsNotEmpty() name!: string;
  @IsOptional() @IsString() description?: string;
  @IsPositive() price!: number;
  @IsIn(['CLP', 'USD', 'COP']) currency!: 'CLP' | 'USD' | 'COP';
  @IsInt() @Min(0) stock!: number;
}
