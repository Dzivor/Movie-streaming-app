import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Movie } from "./Movie";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", unique: true })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @OneToMany(() => Movie, (movie) => movie.category)
  movies!: Movie[];

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}
