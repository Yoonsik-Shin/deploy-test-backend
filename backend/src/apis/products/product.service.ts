import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from '../productTags/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRespository: Repository<Product>,

    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,

    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}

  async findAll() {
    return await this.productRespository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async findOne({ productId }) {
    return await this.productRespository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({ createProductInput }) {
    // 1. 상품만 등록하는 경우
    // const result = await this.productRespository.save({
    //   ...createProductInput,

    //   // 하나하나 직접 나열하는 방식
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 경우
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    const result = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });

    const result2 = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', '');

      // // 이미등록된 태그인지 확인해보기
      // const prevTag = await this.productTagRepository.findOne({
      //   name: tagname,
      // });

      // // 기존 태그가 존재한다면
      // if (prevTag) {
      //   result2.push(prevTag);
      // } else {
      // 기존 태그가 없다면
      const newTag = await this.productTagRepository.save({ name: tagname });
      result2.push(newTag);
      // }
    }

    const result3 = await this.productRespository.save({
      ...product,
      productSaleslocation: result,
      productCategory: { id: productCategoryId },
      productTags: result2,
    });

    return result3;
  }

  async update({ productId, updateProductInput }) {
    const newProduct = {
      id: productId,
      ...updateProductInput,
    };

    return await this.productRespository.save(newProduct);
  }

  async checkSoldOut({ productId }) {
    const product = await this.productRespository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout) {
      throw '이미 판매완료된 상품입니다.';
    }
  }

  async delete({ productId }) {
    // 1. DB에서 삭제
    // const result = await this.productRespository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제 (직접 구현) - isDeleted
    // await this.productRespository.update(
    //   { id: productId },
    //   { isDeleted: true },
    // );

    // 3. 소프트 삭제 (직접 구현) - deletedAt
    // await this.productRespository.update(
    //   { id: productId },
    //   { deletedAt: new Date() },
    // );

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productRespository.softRemove({ id: productId }); // id로만 삭제가능

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.productRespository.softDelete({ id: productId }); // 모든 요소로 삭제가능
    return result.affected ? true : false;
  }
}
