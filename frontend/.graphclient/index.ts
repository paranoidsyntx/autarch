// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { AutarchTypes } from './sources/autarch/types';
import * as importedModule$0 from "./sources/autarch/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

/** Indicates whether the current, partially filled bucket should be included in the response. Defaults to `exclude` */
export type Aggregation_current =
  /** Exclude the current, partially filled bucket from the response */
  | 'exclude'
  /** Include the current, partially filled bucket in the response */
  | 'include';

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type Balance = {
  id: Scalars['Bytes']['output'];
  item: Item;
  character: Character;
  amount: Scalars['BigInt']['output'];
};

export type Balance_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  item?: InputMaybe<Scalars['String']['input']>;
  item_not?: InputMaybe<Scalars['String']['input']>;
  item_gt?: InputMaybe<Scalars['String']['input']>;
  item_lt?: InputMaybe<Scalars['String']['input']>;
  item_gte?: InputMaybe<Scalars['String']['input']>;
  item_lte?: InputMaybe<Scalars['String']['input']>;
  item_in?: InputMaybe<Array<Scalars['String']['input']>>;
  item_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  item_contains?: InputMaybe<Scalars['String']['input']>;
  item_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  item_not_contains?: InputMaybe<Scalars['String']['input']>;
  item_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  item_starts_with?: InputMaybe<Scalars['String']['input']>;
  item_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  item_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  item_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  item_ends_with?: InputMaybe<Scalars['String']['input']>;
  item_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  item_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  item_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  item_?: InputMaybe<Item_filter>;
  character?: InputMaybe<Scalars['String']['input']>;
  character_not?: InputMaybe<Scalars['String']['input']>;
  character_gt?: InputMaybe<Scalars['String']['input']>;
  character_lt?: InputMaybe<Scalars['String']['input']>;
  character_gte?: InputMaybe<Scalars['String']['input']>;
  character_lte?: InputMaybe<Scalars['String']['input']>;
  character_in?: InputMaybe<Array<Scalars['String']['input']>>;
  character_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  character_contains?: InputMaybe<Scalars['String']['input']>;
  character_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  character_not_contains?: InputMaybe<Scalars['String']['input']>;
  character_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  character_starts_with?: InputMaybe<Scalars['String']['input']>;
  character_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  character_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  character_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  character_ends_with?: InputMaybe<Scalars['String']['input']>;
  character_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  character_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  character_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  character_?: InputMaybe<Character_filter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Balance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Balance_filter>>>;
};

export type Balance_orderBy =
  | 'id'
  | 'item'
  | 'item__id'
  | 'item__itemId'
  | 'item__name'
  | 'item__symbol'
  | 'character'
  | 'character__id'
  | 'character__characterId'
  | 'character__name'
  | 'character__classIndex'
  | 'amount';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Character = {
  id: Scalars['Bytes']['output'];
  characterId: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  classIndex: Scalars['BigInt']['output'];
  balances: Array<Balance>;
};


export type CharacterbalancesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Balance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Balance_filter>;
};

export type Character_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  characterId?: InputMaybe<Scalars['BigInt']['input']>;
  characterId_not?: InputMaybe<Scalars['BigInt']['input']>;
  characterId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  characterId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  characterId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  characterId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  characterId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  characterId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  classIndex?: InputMaybe<Scalars['BigInt']['input']>;
  classIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  classIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  classIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  classIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  classIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  classIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  classIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balances_?: InputMaybe<Balance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Character_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Character_filter>>>;
};

export type Character_orderBy =
  | 'id'
  | 'characterId'
  | 'name'
  | 'classIndex'
  | 'balances';

export type Item = {
  id: Scalars['Bytes']['output'];
  itemId: Scalars['Bytes']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type Item_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  itemId?: InputMaybe<Scalars['Bytes']['input']>;
  itemId_not?: InputMaybe<Scalars['Bytes']['input']>;
  itemId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  itemId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  itemId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  itemId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  itemId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  itemId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  itemId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  itemId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Item_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Item_filter>>>;
};

export type Item_orderBy =
  | 'id'
  | 'itemId'
  | 'name'
  | 'symbol';

/**
 * The severity level of a log entry.
 * Log levels are ordered from most to least severe: CRITICAL > ERROR > WARNING > INFO > DEBUG
 */
export type LogLevel =
  /** Critical errors that require immediate attention */
  | 'CRITICAL'
  /** Error conditions that indicate a failure */
  | 'ERROR'
  /** Warning conditions that may require attention */
  | 'WARNING'
  /** Informational messages about normal operations */
  | 'INFO'
  /** Detailed diagnostic information for debugging */
  | 'DEBUG';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  character?: Maybe<Character>;
  characters: Array<Character>;
  item?: Maybe<Item>;
  items: Array<Item>;
  balance?: Maybe<Balance>;
  balances: Array<Balance>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  /** Query execution logs emitted by the subgraph during indexing. Results are sorted by timestamp in descending order (newest first). */
  _logs: Array<_Log_>;
};


export type QuerycharacterArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycharactersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Character_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Character_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryitemArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryitemsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Item_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Item_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybalanceArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybalancesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Balance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Balance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};


export type Query_logsArgs = {
  level?: InputMaybe<LogLevel>;
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/**
 * A key-value pair of additional data associated with a log entry.
 * These correspond to arguments passed to the log function in the subgraph code.
 */
export type _LogArgument_ = {
  /** The parameter name */
  key: Scalars['String']['output'];
  /** The parameter value, serialized as a string */
  value: Scalars['String']['output'];
};

/**
 * Source code location metadata for a log entry.
 * Indicates where in the subgraph's AssemblyScript code the log statement was executed.
 */
export type _LogMeta_ = {
  /** The module or file path where the log was emitted */
  module: Scalars['String']['output'];
  /** The line number in the source file */
  line: Scalars['Int']['output'];
  /** The column number in the source file */
  column: Scalars['Int']['output'];
};

/**
 * A log entry emitted by a subgraph during indexing.
 * Logs can be generated by the subgraph's AssemblyScript code using the `log.*` functions.
 */
export type _Log_ = {
  /** Unique identifier for this log entry */
  id: Scalars['String']['output'];
  /** The deployment hash of the subgraph that emitted this log */
  subgraphId: Scalars['String']['output'];
  /** The timestamp when the log was emitted, in RFC3339 format (e.g., '2024-01-15T10:30:00Z') */
  timestamp: Scalars['String']['output'];
  /** The severity level of the log entry */
  level: LogLevel;
  /** The log message text */
  text: Scalars['String']['output'];
  /** Additional structured data passed to the log function as key-value pairs */
  arguments: Array<_LogArgument_>;
  /** Metadata about the source location in the subgraph code where the log was emitted */
  meta: _LogMeta_;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Aggregation_current: Aggregation_current;
  Aggregation_interval: Aggregation_interval;
  Balance: ResolverTypeWrapper<Balance>;
  Balance_filter: Balance_filter;
  Balance_orderBy: Balance_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  Character: ResolverTypeWrapper<Character>;
  Character_filter: Character_filter;
  Character_orderBy: Character_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  Item: ResolverTypeWrapper<Item>;
  Item_filter: Item_filter;
  Item_orderBy: Item_orderBy;
  LogLevel: LogLevel;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _LogArgument_: ResolverTypeWrapper<_LogArgument_>;
  _LogMeta_: ResolverTypeWrapper<_LogMeta_>;
  _Log_: ResolverTypeWrapper<_Log_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Balance: Balance;
  Balance_filter: Balance_filter;
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  Bytes: Scalars['Bytes']['output'];
  Character: Character;
  Character_filter: Character_filter;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  Item: Item;
  Item_filter: Item_filter;
  Query: {};
  String: Scalars['String']['output'];
  Timestamp: Scalars['Timestamp']['output'];
  _Block_: _Block_;
  _LogArgument_: _LogArgument_;
  _LogMeta_: _LogMeta_;
  _Log_: _Log_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BalanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Balance'] = ResolversParentTypes['Balance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType>;
  character?: Resolver<ResolversTypes['Character'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CharacterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  characterId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  classIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  balances?: Resolver<Array<ResolversTypes['Balance']>, ParentType, ContextType, RequireFields<CharacterbalancesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type ItemResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  itemId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  character?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType, RequireFields<QuerycharacterArgs, 'id' | 'subgraphError'>>;
  characters?: Resolver<Array<ResolversTypes['Character']>, ParentType, ContextType, RequireFields<QuerycharactersArgs, 'skip' | 'first' | 'subgraphError'>>;
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<QueryitemArgs, 'id' | 'subgraphError'>>;
  items?: Resolver<Array<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<QueryitemsArgs, 'skip' | 'first' | 'subgraphError'>>;
  balance?: Resolver<Maybe<ResolversTypes['Balance']>, ParentType, ContextType, RequireFields<QuerybalanceArgs, 'id' | 'subgraphError'>>;
  balances?: Resolver<Array<ResolversTypes['Balance']>, ParentType, ContextType, RequireFields<QuerybalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
  _logs?: Resolver<Array<ResolversTypes['_Log_']>, ParentType, ContextType, RequireFields<Query_logsArgs, 'first' | 'skip' | 'orderDirection'>>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _LogArgument_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_LogArgument_'] = ResolversParentTypes['_LogArgument_']> = ResolversObject<{
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _LogMeta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_LogMeta_'] = ResolversParentTypes['_LogMeta_']> = ResolversObject<{
  module?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  line?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  column?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Log_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Log_'] = ResolversParentTypes['_Log_']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subgraphId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['LogLevel'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  arguments?: Resolver<Array<ResolversTypes['_LogArgument_']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['_LogMeta_'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Balance?: BalanceResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Character?: CharacterResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  Item?: ItemResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  _Block_?: _Block_Resolvers<ContextType>;
  _LogArgument_?: _LogArgument_Resolvers<ContextType>;
  _LogMeta_?: _LogMeta_Resolvers<ContextType>;
  _Log_?: _Log_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = AutarchTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/autarch/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const autarchTransforms = [];
const additionalTypeDefs = [] as any[];
const autarchHandler = new GraphqlHandler({
              name: "autarch",
              config: {"endpoint":"https://api.studio.thegraph.com/query/1757011/autarch-arbitrum-sepolia/version/latest"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("autarch"),
              logger: logger.child("autarch"),
              importFn,
            });
sources[0] = {
          name: 'autarch',
          handler: autarchHandler,
          transforms: autarchTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })
const documentHashMap = {
        "7f22983025b73602e1928ed16820dcb697e956b904083eb6d0054840930db08a": CharacterDocument
      }
additionalEnvelopPlugins.push(usePersistedOperations({
        getPersistedOperation(key) {
          return documentHashMap[key];
        },
        ...{}
      }))

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: CharacterDocument,
        get rawSDL() {
          return printWithCache(CharacterDocument);
        },
        location: 'CharacterDocument.graphql',
        sha256Hash: '7f22983025b73602e1928ed16820dcb697e956b904083eb6d0054840930db08a'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type CharacterQueryVariables = Exact<{
  owner: Scalars['ID']['input'];
}>;


export type CharacterQuery = { character?: Maybe<(
    Pick<Character, 'id' | 'characterId' | 'name' | 'classIndex'>
    & { balances: Array<(
      Pick<Balance, 'amount'>
      & { item: Pick<Item, 'id' | 'itemId'> }
    )> }
  )> };


export const CharacterDocument = gql`
    query Character($owner: ID!) {
  character(id: $owner) {
    id
    characterId
    name
    classIndex
    balances {
      item {
        id
        itemId
      }
      amount
    }
  }
}
    ` as unknown as DocumentNode<CharacterQuery, CharacterQueryVariables>;


export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    Character(variables: CharacterQueryVariables, options?: C): Promise<CharacterQuery> {
      return requester<CharacterQuery, CharacterQueryVariables>(CharacterDocument, variables, options) as Promise<CharacterQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;