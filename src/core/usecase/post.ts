import { UseCaseContext } from '../../types/core';
import { IPostUseCase, Post } from '../../types/post';
import { Logger } from '../../util/logger';
import { createPostSchema } from './schemas/post';
import { validateProperties } from './schemas/shared';

export class PostUseCase implements IPostUseCase {
  private readonly logger = new Logger(PostUseCase.name);
  private readonly postService: UseCaseContext['postService'];

  constructor (ctx: UseCaseContext) {
    this.postService = ctx.postService;
  }

  async createPost (params: Post): Promise<void> {
    validateProperties({
      schema: createPostSchema,
      params,
      errorMsg: 'Invalid properties to create post'
    });
    
    this.logger.console().info('Start create post');
    
    await this.postService.createPost(params);

    this.logger.console().info('Created post');
  }
}