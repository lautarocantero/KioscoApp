import type { OptionLink } from '@typings/ui/layout.types';

export const splitLinks = (links: OptionLink[]) => { 

  const mid = Math.ceil(links.length / 2); 
  const leftLinks = links.slice(0, mid); 
  const rightLinks = links.slice(mid); 

  return { leftLinks, rightLinks }; 
};