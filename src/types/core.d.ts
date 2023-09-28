import { type IUserService, type IUserUseCase } from './user';
import { type Container as InfraContainer } from './infrastructure';
import { IPostService, IPostUseCase } from './post';

export interface ContainerConfig {
  userRepository: InfraContainer['userRepository'];
  postRepository: InfraContainer['postRepository'];
}

export interface ServiceContext {
  userRepository: ContainerConfig['userRepository'];
  postRepository: ContainerConfig['postRepository']
}

export interface UseCaseContext {
  userService: IUserService;
  postService: IPostService;
}

export interface Container {
  userUseCase: IUserUseCase;
  postUseCase: IPostUseCase;
}
