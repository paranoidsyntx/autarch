// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace AutarchTypes {
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

  export type QuerySdk = {
      /** null **/
  character: InContextSdkMethod<Query['character'], QuerycharacterArgs, MeshContext>,
  /** null **/
  characters: InContextSdkMethod<Query['characters'], QuerycharactersArgs, MeshContext>,
  /** null **/
  item: InContextSdkMethod<Query['item'], QueryitemArgs, MeshContext>,
  /** null **/
  items: InContextSdkMethod<Query['items'], QueryitemsArgs, MeshContext>,
  /** null **/
  balance: InContextSdkMethod<Query['balance'], QuerybalanceArgs, MeshContext>,
  /** null **/
  balances: InContextSdkMethod<Query['balances'], QuerybalancesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>,
  /** Query execution logs emitted by the subgraph during indexing. Results are sorted by timestamp in descending order (newest first). **/
  _logs: InContextSdkMethod<Query['_logs'], Query_logsArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["autarch"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
