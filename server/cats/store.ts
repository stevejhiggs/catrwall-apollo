import fetch from 'node-fetch';
import { v4 } from 'uuid';

export interface IKitty {
  id: string;
  imageUrl: string,
  votes: number
}

export let cats: IKitty[] = [];

const srcRegex = /<img src="(.*)">/gi;

const setCats = (newCats: IKitty[]) => {
  const sortedCats = newCats.sort((a, b) => {
    return b.votes - a.votes;
  });

  cats = sortedCats;
}

export const refreshCats = async () => {
  const response = await fetch(`http://thecatapi.com/api/images/get?size=large&type=gif&results_per_page=10&format=html`)
  if (!response.ok) {
    console.log('argh!');
    return;
  }

  const responseBody: string = await response.text();

  const srcs: string[] = [];
  let match;
  while ( ( match = srcRegex.exec( responseBody ) ) && srcs.push( match[1] ) ) {};

  setCats(srcs.map((src) => {
    return {
      imageUrl: src,
      votes: 0,
      id: v4()
    } as IKitty
  }));
}

export const voteForCat = (catId: string) => {
  const clonedCats = cats.slice(0);

  const index = clonedCats.findIndex((cat) => {
    return cat.id === catId;
  })

  if (index < 0) {
    return null;
  }

  clonedCats[index].votes++;
  setCats(clonedCats);

  return clonedCats[index];
}
