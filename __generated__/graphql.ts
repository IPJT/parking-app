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
  /** A JSON Value */
  JSON: { input: any; output: any; }
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
  /** Create a Vehicle */
  vehicleCreate?: Maybe<VehicleCreatePayload>;
  /** Create multiple Vehicle */
  vehicleCreateMany?: Maybe<VehicleCreateManyPayload>;
  /** Delete a Vehicle by ID or unique field */
  vehicleDelete?: Maybe<VehicleDeletePayload>;
  /** Delete multiple Vehicle */
  vehicleDeleteMany?: Maybe<VehicleDeleteManyPayload>;
  /** Update a Vehicle */
  vehicleUpdate?: Maybe<VehicleUpdatePayload>;
  /** Update multiple Vehicle */
  vehicleUpdateMany?: Maybe<VehicleUpdateManyPayload>;
};


export type MutationVehicleCreateArgs = {
  input: VehicleCreateInput;
};


export type MutationVehicleCreateManyArgs = {
  input: Array<VehicleCreateManyInput>;
};


export type MutationVehicleDeleteArgs = {
  by: VehicleByInput;
};


export type MutationVehicleDeleteManyArgs = {
  input: Array<VehicleDeleteManyInput>;
};


export type MutationVehicleUpdateArgs = {
  by: VehicleByInput;
  input: VehicleUpdateInput;
};


export type MutationVehicleUpdateManyArgs = {
  input: Array<VehicleUpdateManyInput>;
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
  /** Query a single Vehicle by an ID or a unique field */
  vehicle?: Maybe<Vehicle>;
  /** Paginated query to fetch the whole list of `Vehicle`. */
  vehicleCollection?: Maybe<VehicleConnection>;
  /** Search `Vehicle` */
  vehicleSearch?: Maybe<VehicleSearchConnection>;
};


export type QueryVehicleArgs = {
  by: VehicleByInput;
};


export type QueryVehicleCollectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<VehicleCollectionFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VehicleOrderByInput>;
};


export type QueryVehicleSearchArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<VehicleSearchFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};

export type SearchInfo = {
  __typename?: 'SearchInfo';
  totalHits: Scalars['Int']['output'];
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

export type Vehicle = {
  __typename?: 'Vehicle';
  accessTokensResponse: Scalars['JSON']['output'];
  brand: Scalars['String']['output'];
  /** when the model was created */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  /** when the model was updated */
  updatedAt: Scalars['DateTime']['output'];
  verifyParkingTimeArray: Array<VerifyParkingTime>;
  vin: Scalars['String']['output'];
};

export type VehicleByInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  vin?: InputMaybe<Scalars['String']['input']>;
};

export type VehicleCollectionFilterInput = {
  id?: InputMaybe<IdCollectionFilterInput>;
};

export type VehicleConnection = {
  __typename?: 'VehicleConnection';
  edges?: Maybe<Array<Maybe<VehicleEdge>>>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
};

/** Input to create a Vehicle */
export type VehicleCreateInput = {
  accessTokensResponse: Scalars['JSON']['input'];
  brand: Scalars['String']['input'];
  name: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  verifyParkingTimeArray?: Array<VerifyParkingTime>;
  vin: Scalars['String']['input'];
};

export type VehicleCreateManyInput = {
  input: VehicleCreateInput;
};

export type VehicleCreateManyPayload = {
  __typename?: 'VehicleCreateManyPayload';
  vehicleCollection: Array<Vehicle>;
};

export type VehicleCreatePayload = {
  __typename?: 'VehicleCreatePayload';
  vehicle?: Maybe<Vehicle>;
};

export type VehicleDeleteManyInput = {
  by: VehicleByInput;
};

export type VehicleDeleteManyPayload = {
  __typename?: 'VehicleDeleteManyPayload';
  deletedIds: Array<Scalars['ID']['output']>;
};

export type VehicleDeletePayload = {
  __typename?: 'VehicleDeletePayload';
  deletedId: Scalars['ID']['output'];
};

export type VehicleEdge = {
  __typename?: 'VehicleEdge';
  cursor: Scalars['String']['output'];
  node: Vehicle;
};

export type VehicleOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

export type VehicleSearchConnection = {
  __typename?: 'VehicleSearchConnection';
  edges: Array<VehicleSearchEdge>;
  pageInfo: PageInfo;
  searchInfo?: Maybe<SearchInfo>;
};

export type VehicleSearchEdge = {
  __typename?: 'VehicleSearchEdge';
  cursor: Scalars['String']['output'];
  node: Vehicle;
  score: Scalars['Float']['output'];
};

export type VehicleSearchFilterInput = {
  ALL?: InputMaybe<Array<VehicleSearchFilterInput>>;
  ANY?: InputMaybe<Array<VehicleSearchFilterInput>>;
  NONE?: InputMaybe<Array<VehicleSearchFilterInput>>;
  NOT?: InputMaybe<VehicleSearchFilterInput>;
  brand?: InputMaybe<StringSearchFilterInput>;
  createdAt?: InputMaybe<DateTimeSearchFilterInput>;
  name?: InputMaybe<StringSearchFilterInput>;
  owner?: InputMaybe<StringSearchFilterInput>;
  updatedAt?: InputMaybe<DateTimeSearchFilterInput>;
  verifyParkingTimeArray?: InputMaybe<VerifyParkingTimeListSearchFilterInput>;
  vin?: InputMaybe<StringSearchFilterInput>;
};

/** Input to update a Vehicle */
export type VehicleUpdateInput = {
  accessTokensResponse?: InputMaybe<Scalars['JSON']['input']>;
  brand?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  verifyParkingTimeArray?: InputMaybe<Array<VerifyParkingTime>>;
  vin?: InputMaybe<Scalars['String']['input']>;
};

export type VehicleUpdateManyInput = {
  by: VehicleByInput;
  input: VehicleUpdateInput;
};

export type VehicleUpdateManyPayload = {
  __typename?: 'VehicleUpdateManyPayload';
  vehicleCollection: Array<Vehicle>;
};

export type VehicleUpdatePayload = {
  __typename?: 'VehicleUpdatePayload';
  vehicle?: Maybe<Vehicle>;
};

export enum VerifyParkingTime {
  Pm20 = 'PM20'
}

export type VerifyParkingTimeListSearchFilterInput = {
  includes?: InputMaybe<VerifyParkingTimeSearchFilterInput>;
  includesNone?: InputMaybe<VerifyParkingTimeSearchFilterInput>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VerifyParkingTimeSearchFilterInput = {
  eq?: InputMaybe<VerifyParkingTime>;
  in?: InputMaybe<Array<VerifyParkingTime>>;
  neq?: InputMaybe<VerifyParkingTime>;
  notIn?: InputMaybe<Array<VerifyParkingTime>>;
};

export type AdminVehicleItem_VehicleFragmentFragment = { __typename?: 'Vehicle', vin: string, name: string, brand: string, owner: string } & { ' $fragmentName'?: 'AdminVehicleItem_VehicleFragmentFragment' };

export type AdminVehicleList_QueryQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  vin: Scalars['String']['input'];
  name: Scalars['String']['input'];
  brand: Scalars['String']['input'];
  owner: Scalars['String']['input'];
}>;


export type AdminVehicleList_QueryQuery = { __typename?: 'Query', vehicleSearch?: { __typename?: 'VehicleSearchConnection', edges: Array<{ __typename?: 'VehicleSearchEdge', node: (
        { __typename?: 'Vehicle', id: string }
        & { ' $fragmentRefs'?: { 'AdminVehicleItem_VehicleFragmentFragment': AdminVehicleItem_VehicleFragmentFragment } }
      ) }>, searchInfo?: { __typename?: 'SearchInfo', totalHits: number } | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } | null };

export type VehicleDelete_MutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type VehicleDelete_MutationMutation = { __typename?: 'Mutation', vehicleDelete?: { __typename?: 'VehicleDeletePayload', deletedId: string } | null };

export type VehicleCard_VehicleFragmentFragment = { __typename?: 'Vehicle', id: string, name: string, brand: string, accessTokensResponse: any, vin: string } & { ' $fragmentName'?: 'VehicleCard_VehicleFragmentFragment' };

export type VehicleSelector_QueryQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  owner: Scalars['String']['input'];
}>;


export type VehicleSelector_QueryQuery = { __typename?: 'Query', vehicleSearch?: { __typename?: 'VehicleSearchConnection', edges: Array<{ __typename?: 'VehicleSearchEdge', node: (
        { __typename?: 'Vehicle', id: string }
        & { ' $fragmentRefs'?: { 'VehicleCard_VehicleFragmentFragment': VehicleCard_VehicleFragmentFragment } }
      ) }> } | null };

export type VehicleAdder_MutationMutationVariables = Exact<{
  vin: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  name: Scalars['String']['input'];
  brand: Scalars['String']['input'];
  accessTokensResponse: Scalars['JSON']['input'];
}>;


export type VehicleAdder_MutationMutation = { __typename?: 'Mutation', vehicleCreate?: { __typename?: 'VehicleCreatePayload', vehicle?: { __typename?: 'Vehicle', vin: string, id: string } | null } | null };

export type VehicleSearch_QueryQueryVariables = Exact<{
  time: Scalars['String']['input'];
}>;


export type VehicleSearch_QueryQuery = { __typename?: 'Query', vehicleSearch?: { __typename?: 'VehicleSearchConnection', edges: Array<{ __typename?: 'VehicleSearchEdge', node: { __typename?: 'Vehicle', vin: string, owner: string, accessTokensResponse: any } }>, searchInfo?: { __typename?: 'SearchInfo', totalHits: number } | null } | null };

export type ModifyAccessTokensResponseOnVehicle_MutationMutationVariables = Exact<{
  vin: Scalars['String']['input'];
  newAccessTokensResponse: Scalars['JSON']['input'];
}>;


export type ModifyAccessTokensResponseOnVehicle_MutationMutation = { __typename?: 'Mutation', vehicleUpdate?: { __typename?: 'VehicleUpdatePayload', vehicle?: { __typename?: 'Vehicle', id: string } | null } | null };

export const AdminVehicleItem_VehicleFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminVehicleItem_VehicleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vehicle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vin"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}}]}}]} as unknown as DocumentNode<AdminVehicleItem_VehicleFragmentFragment, unknown>;
export const VehicleCard_VehicleFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VehicleCard_VehicleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vehicle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"accessTokensResponse"}},{"kind":"Field","name":{"kind":"Name","value":"vin"}}]}}]} as unknown as DocumentNode<VehicleCard_VehicleFragmentFragment, unknown>;
export const AdminVehicleList_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminVehicleList_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brand"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"owner"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vehicleSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ALL"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vin"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"regex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vin"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"regex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"brand"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"regex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brand"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"owner"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"regex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"owner"}}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminVehicleItem_VehicleFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalHits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminVehicleItem_VehicleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vehicle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vin"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}}]}}]} as unknown as DocumentNode<AdminVehicleList_QueryQuery, AdminVehicleList_QueryQueryVariables>;
export const VehicleDelete_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VehicleDelete_Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vehicleDelete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletedId"}}]}}]}}]} as unknown as DocumentNode<VehicleDelete_MutationMutation, VehicleDelete_MutationMutationVariables>;
export const VehicleSelector_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VehicleSelector_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"owner"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vehicleSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"owner"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"owner"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VehicleCard_VehicleFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VehicleCard_VehicleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vehicle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"accessTokensResponse"}},{"kind":"Field","name":{"kind":"Name","value":"vin"}}]}}]} as unknown as DocumentNode<VehicleSelector_QueryQuery, VehicleSelector_QueryQueryVariables>;
export const VehicleAdder_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VehicleAdder_Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"owner"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brand"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accessTokensResponse"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vehicleCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vin"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"owner"},"value":{"kind":"Variable","name":{"kind":"Name","value":"owner"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"brand"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brand"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"accessTokensResponse"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accessTokensResponse"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vehicle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vin"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<VehicleAdder_MutationMutation, VehicleAdder_MutationMutationVariables>;
export const VehicleSearch_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VehicleSearch_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"time"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vehicleSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"time"}}},{"kind":"Argument","name":{"kind":"Name","value":"fields"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"verifyParkingTimeArray","block":false}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vin"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"accessTokensResponse"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalHits"}}]}}]}}]}}]} as unknown as DocumentNode<VehicleSearch_QueryQuery, VehicleSearch_QueryQueryVariables>;
export const ModifyAccessTokensResponseOnVehicle_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ModifyAccessTokensResponseOnVehicle_Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newAccessTokensResponse"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vehicleUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vin"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"accessTokensResponse"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newAccessTokensResponse"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vehicle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ModifyAccessTokensResponseOnVehicle_MutationMutation, ModifyAccessTokensResponseOnVehicle_MutationMutationVariables>;