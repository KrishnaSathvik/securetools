export interface SisterSite {
  name: string;
  url: string;
  blurb: string;
  shortLabel: string;
}

export const SISTER_SITES: SisterSite[] = [
  {
    name: 'ByteToolBox',
    url: 'https://www.bytetoolbox.com/',
    blurb: 'Developer tools for JSON, Base64, hashes, UUIDs, regex, and timestamps.',
    shortLabel: 'Developer tools',
  },
  {
    name: 'TextCraft',
    url: 'https://www.textcraft.dev/',
    blurb: 'Fast browser tools for counting, cleaning, converting, comparing, and organizing text.',
    shortLabel: 'Text processing',
  },
];
