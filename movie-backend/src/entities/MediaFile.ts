import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Movie } from "./Movie";

@Entity("media_files")
export class MediaFile {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  url!: string;

  @Column({ type: "text" })
  type!: string;

  @OneToMany(() => Movie, (movie) => movie.thumbnail_media)
  thumbnail_movies!: Movie[];

  @OneToMany(() => Movie, (movie) => movie.video_media)
  video_movies!: Movie[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
