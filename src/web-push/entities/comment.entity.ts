import { BaseTimeEntity } from 'src/common/entities/BaseTimeEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Resume } from './resume.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  major: number;

  @ManyToOne(() => User, (User) => User.commentId)
  User: User;

  @ManyToOne(() => Resume, (Resume) => Resume.commentId)
  Resume: Resume;

  static of(
    comment: string,
    major: number,
    User: User,
    Resume: Resume,
  ): Comment {
    const comments: Comment = new Comment();

    comments.comment = comment;
    comments.major = major;
    comments.User = User;
    comments.Resume = Resume;

    return comments;
  }
}