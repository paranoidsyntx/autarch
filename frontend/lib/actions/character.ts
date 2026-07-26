"use server";

const SUBGRAPH_URL = "https://api.studio.thegraph.com/query/1757011/autarch-arbitrum-sepolia/version/latest";

const CHARACTER_QUERY = `
  query Character($owner: ID!) {
    character(id: $owner) {
      id
      characterId
      name
      classIndex
      balances(first: 100) {
        item {
          id
          itemId
        }
        amount
      }
    }
  }
`;

export interface CharacterBalance {
  item: { id: string; itemId: string };
  amount: string;
}

export interface Character {
  id: string;
  characterId: string;
  name: string;
  classIndex: string;
  balances: CharacterBalance[];
}

export async function getCharacter(owner: string): Promise<Character | null> {
  const res = await fetch(SUBGRAPH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: CHARACTER_QUERY, variables: { owner } }),
  });
  const json = await res.json();
  return json.data?.character ?? null;
}
