// A theme is three seeds and one solved number. Everything else on the site is
// color-mix(ink into ground), so nothing here restates a colour that can be derived.
//
// `mix` is the tertiary percentage: 14px muted text needs 4.5:1, and how much ink that takes
// depends on how light the GROUND is — not on whether the theme is nominally dark or light.
// A flat 50% gives 4.65:1 on Brass, 4.24:1 on Slate and 3.30:1 on Cream. The last two fail.
// These values are solved, and every theme passes AA on body, secondary, tertiary and accent.
export type Theme = { id: string; name: string; ground: string; ink: string; accent: string; mix: string };

export const themes: Theme[] = [
  { id: 'brass', name: 'Brass', ground: '#0A0B0D', ink: '#EDEBE4', accent: '#D9A441', mix: '49%' },
  { id: 'slate', name: 'Slate', ground: '#27333A', ink: '#E6ECEF', accent: '#FF8A6B', mix: '56%' },
  { id: 'moss',  name: 'Moss',  ground: '#12241C', ink: '#E7EDE4', accent: '#E88BB0', mix: '51%' },
  { id: 'cream', name: 'Cream', ground: '#F3EDDF', ink: '#191611', accent: '#5C3F86', mix: '61%' },
];
