import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_categoria: number;

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

  @CreateDateColumn({ name: 'created_At', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_At', select: false })
  updatedAt: Date;
}
