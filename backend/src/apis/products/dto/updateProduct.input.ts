import { Field, InputType, PartialType } from '@nestjs/graphql';
import { createProductInput } from './createProduct.input';

@InputType()
export class UpdateProductInput extends PartialType(createProductInput) {}
