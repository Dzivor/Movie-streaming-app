import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("admin_logs")
export class AdminLog {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.admin_logs)
  @JoinColumn({ name: "admin_id" })
  admin!: User;

  @Column({ type: "text" })
  action!: string;

  @Column({ type: "text" })
  entity_type!: string;

  @Column({ type: "uuid" })
  entity_id!: string;

  @CreateDateColumn()
  created_at!: Date;
}
