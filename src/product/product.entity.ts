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
import { Product_Img } from './product_image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  desc: string;

  @Column()
  unity: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  brand: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @ManyToOne(() => category, () => Product, {
    eager: true,
  })
  @JoinColumn({ name: 'id_categoria' })
  id_categoria: category;

  @OneToMany(() => Product_Img, (productImage) => productImage.product, {
    eager: true,
    onDelete: 'CASCADE',
  })
  images: Product_Img[];

  @CreateDateColumn({ name: 'created_At', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_At', select: false })
  updatedAt: Date;
}
