import { Surreal } from 'surrealdb.node';

export type SurrealService = Omit<
  Surreal,
  | 'connect'
  | 'use'
  | 'signup'
  | 'signin'
  | 'invalidate'
  | 'authenticate'
  | 'patch'
  | 'version'
  | 'health'
>;
