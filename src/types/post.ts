export interface Post {
  id?: number;
  userId: number;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPostUseCase {
  createPost(params: Post): Promise<Partial<void>>;
}

export interface IPostService {
  createPost(post: Post): Promise<void>;
}

export interface IPostRespository {
  savePost(post: Post): Promise<void>;
}