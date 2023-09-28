import { UserService } from './service/user';
import { UserUseCase } from './usecase/user';

import { ContainerConfig, Container } from '../types/core';
import { PostService } from './service/post';
import { PostUseCase } from './usecase/post';

export function createContainer (config: ContainerConfig): Container {
  const serviceContext = {
    userRepository: config.userRepository,
    postRepository: config.postRepository,
  };

  const useCaseContext = {
    userService: new UserService(serviceContext),
    postService: new PostService(serviceContext)
  };

  return {
    userUseCase: new UserUseCase(useCaseContext),
    postUseCase: new PostUseCase(useCaseContext)
  };
}
