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
import { AdminLog } from "./AdminLog";
import { Role } from "./Role";
import { Subscription } from "./Subscription";
import { WatchSession } from "./Watchsession";
import { Movie } from "./Movie";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  password_hash!: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: "role_id" })
  role!: Role;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions!: Subscription[];

  @OneToMany(() => WatchSession, (session) => session.user)
  watch_sessions!: WatchSession[];

  @OneToMany(() => AdminLog, (log) => log.admin)
  admin_logs!: AdminLog[];

  @OneToMany(() => Movie, (movie) => movie.uploaded_by)
  uploaded_movies!: Movie[];

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
