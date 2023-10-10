/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment AdminVehicleItem_VehicleFragment on Vehicle {\n    vin\n    name\n    brand\n    owner\n  }\n": types.AdminVehicleItem_VehicleFragmentFragmentDoc,
    "\n  query AdminVehicleList_Query($after: String, $vin: String!, $name: String!, $brand: String!, $owner: String!) {\n    vehicleSearch(\n      first: 10\n      after: $after\n      filter: {\n        ALL: [\n          { vin: { regex: $vin } }\n          { name: { regex: $name } }\n          { brand: { regex: $brand } }\n          { owner: { regex: $owner } }\n        ]\n      }\n    ) {\n      edges {\n        node {\n          ...AdminVehicleItem_VehicleFragment\n          id\n        }\n      }\n      searchInfo {\n        totalHits\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.AdminVehicleList_QueryDocument,
    "\n  mutation VehicleDelete_Mutation($id: ID!) {\n    vehicleDelete(by: { id: $id }) {\n      deletedId\n    }\n  }\n": types.VehicleDelete_MutationDocument,
    "\n  fragment VehicleCard_VehicleFragment on Vehicle {\n    id\n    name\n    brand\n    accessTokensReponse\n    vin\n  }\n": types.VehicleCard_VehicleFragmentFragmentDoc,
    "\n  query VechicleSelector_Query($first: Int!, $owner: String!) {\n    vehicleSearch(first: $first, filter: { owner: { eq: $owner } }) {\n      edges {\n        node {\n          ...VehicleCard_VehicleFragment\n          id\n        }\n      }\n    }\n  }\n": types.VechicleSelector_QueryDocument,
    "\n  mutation VehicleAdder_Mutation(\n    $vin: String!\n    $owner: String!\n    $name: String!\n    $brand: String!\n    $accessTokensReponse: JSON!\n  ) {\n    vehicleCreate(\n      input: { vin: $vin, owner: $owner, name: $name, brand: $brand, accessTokensReponse: $accessTokensReponse }\n    ) {\n      vehicle {\n        vin\n        id\n      }\n    }\n  }\n": types.VehicleAdder_MutationDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AdminVehicleItem_VehicleFragment on Vehicle {\n    vin\n    name\n    brand\n    owner\n  }\n"): (typeof documents)["\n  fragment AdminVehicleItem_VehicleFragment on Vehicle {\n    vin\n    name\n    brand\n    owner\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AdminVehicleList_Query($after: String, $vin: String!, $name: String!, $brand: String!, $owner: String!) {\n    vehicleSearch(\n      first: 10\n      after: $after\n      filter: {\n        ALL: [\n          { vin: { regex: $vin } }\n          { name: { regex: $name } }\n          { brand: { regex: $brand } }\n          { owner: { regex: $owner } }\n        ]\n      }\n    ) {\n      edges {\n        node {\n          ...AdminVehicleItem_VehicleFragment\n          id\n        }\n      }\n      searchInfo {\n        totalHits\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query AdminVehicleList_Query($after: String, $vin: String!, $name: String!, $brand: String!, $owner: String!) {\n    vehicleSearch(\n      first: 10\n      after: $after\n      filter: {\n        ALL: [\n          { vin: { regex: $vin } }\n          { name: { regex: $name } }\n          { brand: { regex: $brand } }\n          { owner: { regex: $owner } }\n        ]\n      }\n    ) {\n      edges {\n        node {\n          ...AdminVehicleItem_VehicleFragment\n          id\n        }\n      }\n      searchInfo {\n        totalHits\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VehicleDelete_Mutation($id: ID!) {\n    vehicleDelete(by: { id: $id }) {\n      deletedId\n    }\n  }\n"): (typeof documents)["\n  mutation VehicleDelete_Mutation($id: ID!) {\n    vehicleDelete(by: { id: $id }) {\n      deletedId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment VehicleCard_VehicleFragment on Vehicle {\n    id\n    name\n    brand\n    accessTokensReponse\n    vin\n  }\n"): (typeof documents)["\n  fragment VehicleCard_VehicleFragment on Vehicle {\n    id\n    name\n    brand\n    accessTokensReponse\n    vin\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query VechicleSelector_Query($first: Int!, $owner: String!) {\n    vehicleSearch(first: $first, filter: { owner: { eq: $owner } }) {\n      edges {\n        node {\n          ...VehicleCard_VehicleFragment\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query VechicleSelector_Query($first: Int!, $owner: String!) {\n    vehicleSearch(first: $first, filter: { owner: { eq: $owner } }) {\n      edges {\n        node {\n          ...VehicleCard_VehicleFragment\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VehicleAdder_Mutation(\n    $vin: String!\n    $owner: String!\n    $name: String!\n    $brand: String!\n    $accessTokensReponse: JSON!\n  ) {\n    vehicleCreate(\n      input: { vin: $vin, owner: $owner, name: $name, brand: $brand, accessTokensReponse: $accessTokensReponse }\n    ) {\n      vehicle {\n        vin\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation VehicleAdder_Mutation(\n    $vin: String!\n    $owner: String!\n    $name: String!\n    $brand: String!\n    $accessTokensReponse: JSON!\n  ) {\n    vehicleCreate(\n      input: { vin: $vin, owner: $owner, name: $name, brand: $brand, accessTokensReponse: $accessTokensReponse }\n    ) {\n      vehicle {\n        vin\n        id\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;