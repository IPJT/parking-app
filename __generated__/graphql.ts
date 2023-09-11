/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, is compliant with the date-time format outlined in section 5.6 of the RFC 3339
   * profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
   *
   * This scalar is a description of an exact instant on the timeline such as the instant that a user account was created.
   *
   * # Input Coercion
   *
   * When expected as an input type, only RFC 3339 compliant date-time strings are accepted. All other input values raise a query error indicating an incorrect type.
   *
   * # Result Coercion
   *
   * Where an RFC 3339 compliant date-time string has a time-zone other than UTC, it is shifted to UTC.
   * For example, the date-time string 2016-01-01T14:10:20+01:00 is shifted to 2016-01-01T13:10:20Z.
   */
  DateTime: { input: any; output: any; }
};

export type Car = {
  __typename?: 'Car';
  brand: Scalars['String']['output'];
  /** when the model was created */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  /** when the model was updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type CarByInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CarCollectionFilterInput = {
  id?: InputMaybe<IdCollectionFilterInput>;
};

export type CarConnection = {
  __typename?: 'CarConnection';
  edges?: Maybe<Array<Maybe<CarEdge>>>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
};

/** Input to create a Car */
export type CarCreateInput = {
  brand: Scalars['String']['input'];
  name: Scalars['String']['input'];
  owner?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
};

export type CarCreateManyInput = {
  input: CarCreateInput;
};

export type CarCreateManyPayload = {
  __typename?: 'CarCreateManyPayload';
  carCollection: Array<Car>;
};

export type CarCreatePayload = {
  __typename?: 'CarCreatePayload';
  car?: Maybe<Car>;
};

export type CarDeleteManyInput = {
  by: CarByInput;
};

export type CarDeleteManyPayload = {
  __typename?: 'CarDeleteManyPayload';
  deletedIds: Array<Scalars['ID']['output']>;
};

export type CarDeletePayload = {
  __typename?: 'CarDeletePayload';
  deletedId: Scalars['ID']['output'];
};

export type CarEdge = {
  __typename?: 'CarEdge';
  cursor: Scalars['String']['output'];
  node: Car;
};

export type CarOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

export type CarSearchConnection = {
  __typename?: 'CarSearchConnection';
  edges: Array<CarSearchEdge>;
  pageInfo: PageInfo;
  searchInfo?: Maybe<SearchInfo>;
};

export type CarSearchEdge = {
  __typename?: 'CarSearchEdge';
  cursor: Scalars['String']['output'];
  node: Car;
  score: Scalars['Float']['output'];
};

export type CarSearchFilterInput = {
  ALL?: InputMaybe<Array<CarSearchFilterInput>>;
  ANY?: InputMaybe<Array<CarSearchFilterInput>>;
  NONE?: InputMaybe<Array<CarSearchFilterInput>>;
  NOT?: InputMaybe<CarSearchFilterInput>;
  brand?: InputMaybe<StringSearchFilterInput>;
  createdAt?: InputMaybe<DateTimeSearchFilterInput>;
  name?: InputMaybe<StringSearchFilterInput>;
  owner?: InputMaybe<StringOrNullSearchFilterInput>;
  status?: InputMaybe<StringSearchFilterInput>;
  updatedAt?: InputMaybe<DateTimeSearchFilterInput>;
};

/** Input to update a Car */
export type CarUpdateInput = {
  brand?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type CarUpdateManyInput = {
  by: CarByInput;
  input: CarUpdateInput;
};

export type CarUpdateManyPayload = {
  __typename?: 'CarUpdateManyPayload';
  carCollection: Array<Car>;
};

export type CarUpdatePayload = {
  __typename?: 'CarUpdatePayload';
  car?: Maybe<Car>;
};

export type DateTimeSearchFilterInput = {
  ALL?: InputMaybe<Array<DateTimeSearchFilterInput>>;
  ANY?: InputMaybe<Array<DateTimeSearchFilterInput>>;
  NONE?: InputMaybe<Array<DateTimeSearchFilterInput>>;
  NOT?: InputMaybe<DateTimeSearchFilterInput>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type IdCollectionFilterInput = {
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a Car */
  carCreate?: Maybe<CarCreatePayload>;
  /** Create multiple Car */
  carCreateMany?: Maybe<CarCreateManyPayload>;
  /** Delete a Car by ID or unique field */
  carDelete?: Maybe<CarDeletePayload>;
  /** Delete multiple Car */
  carDeleteMany?: Maybe<CarDeleteManyPayload>;
  /** Update a Car */
  carUpdate?: Maybe<CarUpdatePayload>;
  /** Update multiple Car */
  carUpdateMany?: Maybe<CarUpdateManyPayload>;
};


export type MutationCarCreateArgs = {
  input: CarCreateInput;
};


export type MutationCarCreateManyArgs = {
  input: Array<CarCreateManyInput>;
};


export type MutationCarDeleteArgs = {
  by: CarByInput;
};


export type MutationCarDeleteManyArgs = {
  input: Array<CarDeleteManyInput>;
};


export type MutationCarUpdateArgs = {
  by: CarByInput;
  input: CarUpdateInput;
};


export type MutationCarUpdateManyArgs = {
  input: Array<CarUpdateManyInput>;
};

export enum OrderByDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** Query a single Car by an ID or a unique field */
  car?: Maybe<Car>;
  /** Paginated query to fetch the whole list of `Car`. */
  carCollection?: Maybe<CarConnection>;
  /** Search `Car` */
  carSearch?: Maybe<CarSearchConnection>;
};


export type QueryCarArgs = {
  by: CarByInput;
};


export type QueryCarCollectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<CarCollectionFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CarOrderByInput>;
};


export type QueryCarSearchArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<CarSearchFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};

export type SearchInfo = {
  __typename?: 'SearchInfo';
  totalHits: Scalars['Int']['output'];
};

export type StringOrNullSearchFilterInput = {
  ALL?: InputMaybe<Array<StringOrNullSearchFilterInput>>;
  ANY?: InputMaybe<Array<StringOrNullSearchFilterInput>>;
  NONE?: InputMaybe<Array<StringOrNullSearchFilterInput>>;
  NOT?: InputMaybe<StringOrNullSearchFilterInput>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  regex?: InputMaybe<Scalars['String']['input']>;
};

export type StringSearchFilterInput = {
  ALL?: InputMaybe<Array<StringSearchFilterInput>>;
  ANY?: InputMaybe<Array<StringSearchFilterInput>>;
  NONE?: InputMaybe<Array<StringSearchFilterInput>>;
  NOT?: InputMaybe<StringSearchFilterInput>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  regex?: InputMaybe<Scalars['String']['input']>;
};

export type AddVehicleForUserQueryMutationVariables = Exact<{
  owner: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: Scalars['String']['input'];
  brand: Scalars['String']['input'];
}>;


export type AddVehicleForUserQueryMutation = { __typename?: 'Mutation', carCreate?: { __typename?: 'CarCreatePayload', car?: { __typename?: 'Car', id: string } | null } | null };

export type GetAllVehiclesForUserQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  owner: Scalars['String']['input'];
}>;


export type GetAllVehiclesForUserQuery = { __typename?: 'Query', carSearch?: { __typename?: 'CarSearchConnection', edges: Array<{ __typename?: 'CarSearchEdge', node: { __typename?: 'Car', name: string, brand: string, owner?: string | null, status: string, id: string, createdAt: any, updatedAt: any } }> } | null };


export const AddVehicleForUserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddVehicleForUserQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"owner"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brand"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"carCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"owner"},"value":{"kind":"Variable","name":{"kind":"Name","value":"owner"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"brand"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brand"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"car"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddVehicleForUserQueryMutation, AddVehicleForUserQueryMutationVariables>;
export const GetAllVehiclesForUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllVehiclesForUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"owner"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"carSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"owner"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"owner"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllVehiclesForUserQuery, GetAllVehiclesForUserQueryVariables>;