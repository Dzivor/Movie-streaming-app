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

export type SubscriptionStatus = "active" | "expired" | "cancelled";

@Entity("subscriptions")
export class Subscription {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.subscriptions)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "text" })
  status!: SubscriptionStatus;

  @Column({ type: "text" })
  plan_name!: string;

  @Column({ type: "timestamp" })
  start_date!: Date;

  @Column({ type: "timestamp", nullable: true })
  end_date?: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
