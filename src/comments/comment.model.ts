import { Schema, Document } from 'mongoose';

export interface Comment extends Document {
  postId: string; 
  content: string;
}

export const CommentSchema = new Schema<Comment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true } as any, 
    content: { type: String, required: true },
  },
  { timestamps: true },
);
