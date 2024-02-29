import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.model';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>) {}

  async getAllCommentsForPost(postId: string): Promise<Comment[]> {
    return await this.commentModel.find({ postId }).exec();
  }

  async createComment(postId: string, commentData: Comment): Promise<Comment> {
    const createdComment = new this.commentModel({ ...commentData, postId });
    return await createdComment.save();
  }

  async updateComment(commentId: string, commentData: Comment): Promise<Comment> {
    const updatedComment = await this.commentModel.findByIdAndUpdate(commentId, commentData, { new: true }).exec();
    if (!updatedComment) {
      throw new NotFoundException('Comentario no encontrado');
    }
    return updatedComment;
  }

  async deleteComment(commentId: string): Promise<void> {
    const deletedComment = await this.commentModel.findByIdAndDelete(commentId).exec();
    if (!deletedComment) {
      throw new NotFoundException('Comentario no encontrado');
    }
  }
}
