import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "./Role";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid") id!: string;

  @Column({ unique: true }) email!: string;
  @Column() first_name!: string;
  @Column() last_name!: string;
  @Column() password_hash!: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: "role_id" })
  role!: Role;

  @Column({ default: true }) is_active!: boolean;
  @CreateDateColumn() created_at!: Date;
  @UpdateDateColumn() updated_at!: Date;
}
