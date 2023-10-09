export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserUseCase {
  createUser(params: User): Promise<Partial<User>>;
  find(params: Partial<User>): Promise<User[]>;
}

export interface IUserService {
  saveUser(user: User): Promise<User>;
  find(params: Partial<User>): Promise<User[]>;
}

export interface IUserRepository {
  saveUser(user: User): Promise<User>;
  find(params: Partial<User>): Promise<User[]>;
}
