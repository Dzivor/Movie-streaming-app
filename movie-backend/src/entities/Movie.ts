import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { MediaFile } from "./MediaFile";
import { User } from "./User";
import { WatchSession } from "./Watchsession";

@Entity("movies")
export class Movie {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "int" })
  duration_seconds!: number;

  @Column({ type: "int" })
  release_year!: number;

  @Column({ type: "text", nullable: true })
  age_rating?: string;

  @Column({ type: "int", nullable: true })
  preview_time_limit?: number;

  @ManyToOne(() => User, (user) => user.uploaded_movies)
  @JoinColumn({ name: "uploaded_by" })
  uploaded_by!: User;

  @ManyToOne(() => MediaFile, (media) => media.thumbnail_movies)
  @JoinColumn({ name: "thumbnail_media_id" })
  thumbnail_media!: MediaFile;

  @ManyToOne(() => MediaFile, (media) => media.video_movies)
  @JoinColumn({ name: "video_media_id" })
  video_media!: MediaFile;

  @ManyToOne(() => Category, (category) => category.movies)
  @JoinColumn({ name: "category_id" })
  category!: Category;

  @OneToMany(() => WatchSession, (session) => session.movie)
  watch_sessions!: WatchSession[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
