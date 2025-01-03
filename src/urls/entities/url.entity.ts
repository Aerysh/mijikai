import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('urls')
export class UrlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  @IsUrl()
  originalUrl: string;

  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
  })
  @IsString()
  shortCode: string;

  @Column({ type: 'int', default: 0 })
  @IsInt()
  @Min(0)
  hits: number;

  @CreateDateColumn()
  @IsDateString()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  @IsDateString()
  updatedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  @IsDateString()
  @IsOptional()
  expiresAt?: Date;
}
