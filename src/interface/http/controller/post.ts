import { HttpControllerConfig, HttpNext, HttpRequest, HttpResponse, HttpRouter, IHttpRoute } from '../../../types/interface';
import { Post } from '../../../types/post';
import { Logger } from '../../../util/logger';
import { createPostSchema } from '../schema/post';

export class PostController implements IHttpRoute {
  private readonly logger = new Logger(PostController.name);
  private readonly _validator: HttpControllerConfig['validator'];
  private readonly postUseCase: HttpControllerConfig['coreContainer']['postUseCase'];

  constructor({ coreContainer, validator }: HttpControllerConfig) {
    this._validator = validator;
    this.postUseCase = coreContainer.postUseCase;
  }

  register (router: HttpRouter): void {
    router
      .route('/v1/post')
      .post(
        this._validator(createPostSchema),
        this.savePost.bind(this)
      );
  }

  async savePost(req: HttpRequest, res: HttpResponse, next: HttpNext) {
    try {
      this.logger.console().info('Start post creation');
      
      const { userId, text } = req.body;

      const post: Post = {
        userId,
        text
      };

      await this.postUseCase.createPost(post);

      this.logger.console().info('End post creation');

      res.status(200).send();
    } catch (error) {
      this.logger.console().error(`Create post error: ${error}`);

      next(error);
    }
  }
}