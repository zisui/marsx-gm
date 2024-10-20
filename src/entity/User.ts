import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  uuid?: string;

  @Column({ default: "" })
  avatar?: string;

  @Column({ default: "" })
  marsxUid?: string;

  @Column({ default: "" })
  username?: string;

  @Column({ default: "" })
  phone?: string;

  @Column({ default: "" })
  password?: string;

  // 创建时间
  @Column({ type: 'bigint' })
  createTime?: number = Date.now();
}
