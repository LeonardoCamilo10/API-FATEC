import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
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
}
