import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<category>,
  ) {}

  async findAllCategory() {
    return await this.categoryRepository.find();
  }

  async findIdCategory(id: number) {
    const findIdCategory = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (findIdCategory === null) {
      throw new NotFoundException('Category Not exists!');
    }

    return findIdCategory;
  }

  async createCategory(body: object) {
    await this.findNameCategory(body['name']);
    const product = this.categoryRepository.create(body);
    return await this.categoryRepository.save(product);
  }

  async updateCategory(body: object, id: number) {
    const findIdCategory = await this.findIdCategory(id);
    await this.findNameCategory(body['name'], id);
    const updateCategory = Object.assign(findIdCategory, body);

    await this.categoryRepository.update({ id }, updateCategory);

    return this.findIdCategory(id);
  }

  async deleteCategory(id: number) {
    const findIdCategory = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (findIdCategory === null) {
      throw new NotFoundException('Category Not exists!');
    }

    await this.categoryRepository.remove(findIdCategory);
  }

  async findNameCategory(name: string, id = 0) {
    const findNameCategory = await this.categoryRepository.find({
      where: { name },
    });

    if (findNameCategory.length > 0 && findNameCategory[0].id != id) {
      throw new NotFoundException('Category exists!');
    }
  }
}
