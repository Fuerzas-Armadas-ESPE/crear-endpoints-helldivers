import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.model';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getAllCommentsForPost(@Param('postId') postId: string): Promise<Comment[]> {
    return await this.commentsService.getAllCommentsForPost(postId);
  }

  @Post()
  async createComment(@Param('postId') postId: string, @Body() commentData: Comment): Promise<Comment> {
    return await this.commentsService.createComment(postId, commentData);
  }

  @Put(':commentId')
  async updateComment(@Param('commentId') commentId: string, @Body() commentData: Comment): Promise<Comment> {
    return await this.commentsService.updateComment(commentId, commentData);
  }

  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: string): Promise<void> {
    await this.commentsService.deleteComment(commentId);
  }
}
