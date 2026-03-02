import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Movie } from "./Movie";

@Entity("watch_sessions")
export class WatchSession {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.watch_sessions)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Movie, (movie) => movie.watch_sessions)
  @JoinColumn({ name: "movie_id" })
  movie!: Movie;

  @Column({ type: "timestamp" })
  started_at!: Date;

  @Column({ type: "int" })
  last_position_seconds!: number;

  @Column({ type: "boolean", default: false })
  is_completed!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
