import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRespository: Repository<ProductCategory>,
  ) {}

  async create({ name }) {
    const result = await this.productCategoryRespository.save({
      name,
    });

    return result;
  }
}
