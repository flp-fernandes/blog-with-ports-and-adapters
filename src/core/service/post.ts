import { ServiceContext } from '../../types/core';
import { IPostService, Post } from '../../types/post';
import { Logger } from '../../util/logger';

export class PostService implements IPostService {
  private readonly logger = new Logger(PostService.name);
  private readonly postRepository: ServiceContext['postRepository'];

  constructor (ctx: ServiceContext) {
    this.postRepository = ctx.postRepository;
  }
  
  async createPost (post: Post): Promise<void> {
    this.logger.console().info('Called repository');

    return await this.postRepository.savePost(post);
  }
}