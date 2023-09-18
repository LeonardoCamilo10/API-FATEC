import { category } from 'src/category/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Product_Image } from './product_image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => category, () => Product, {
    eager: true,
  })
  @JoinColumn({ name: 'id_categoria' })
  id_categoria: category;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  marca: string;

  @Column()
  preco: number;

  @Column()
  estoque: number;

  @Column()
  largura: number;

  @Column()
  comprimento: number;

  @Column()
  peso: number;

  @Column()
  altura: number;

  @OneToMany(() => Product_Image, (productImage) => productImage.productId, {
    eager: true,
    onDelete: 'CASCADE',
  })
  images: Product_Image[];

  @CreateDateColumn({ name: 'created_At', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_At', select: false })
  updatedAt: Date;
}
