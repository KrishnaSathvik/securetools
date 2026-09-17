import { describe, expect, it } from 'vitest';
import { SISTER_SITES } from '../sisterSites';

describe('SISTER_SITES', () => {
  it('points SecureTools at ByteToolBox and TextCraft only', () => {
    expect(SISTER_SITES.map((site) => site.name)).toEqual(['ByteToolBox', 'TextCraft']);
    expect(SISTER_SITES.map((site) => site.url)).toEqual([
      'https://www.bytetoolbox.com/',
      'https://www.textcraft.dev/',
    ]);
  });
});
