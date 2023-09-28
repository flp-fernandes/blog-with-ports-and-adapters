import { IMysqlAdapter } from '../../types/infrastructure';
import { IPostRespository, Post } from '../../types/post';
import { FailedToSavePost } from '../../util/error';
import { Logger } from '../../util/logger';

export interface PostRepositoryContext {
  mysqlAdapter: IMysqlAdapter;
}

export class PostRepository implements IPostRespository {
  private readonly logger = new Logger(PostRepository.name);
  private readonly mysqlAdapter: IMysqlAdapter;

  constructor({ mysqlAdapter }: PostRepositoryContext) {
    this.mysqlAdapter = mysqlAdapter;
    this.mysqlAdapter.tableName = 'post';
  }
  
  async savePost (post: Post): Promise<void> {
    try {
      await this.mysqlAdapter
        .db
        .insert({ ...post });
    } catch (error) {
      console.log('error :>> ', error);
      throw new FailedToSavePost('Failed to save post');
    }  
  }
}