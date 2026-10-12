// A theme is three seeds and one solved number. Everything else on the site is
// color-mix(ink into ground), so nothing here restates a colour that can be derived.
//
// `mix` is the tertiary percentage: 14px muted text needs 4.5:1, and how much ink that takes
// depends on how light the GROUND is — not on whether the theme is nominally dark or light.
// These values are solved so 14px muted text passes 4.5:1 on both the ground and the surface cards,
// and every theme passes AA on body, secondary, tertiary and accent.
export type Theme = { id: string; name: string; ground: string; ink: string; accent: string; mix: string };

export const themes: Theme[] = [
  { id: 'butter',   name: 'Graphite & Butter', ground: '#0F1110', ink: '#FFF6D5', accent: '#8EE0B0', mix: '51%' },
  { id: 'seaglass', name: 'Sea Glass',         ground: '#0A1822', ink: '#DDF2EC', accent: '#F2B36B', mix: '54%' },
  { id: 'plum',     name: 'Plum Dusk',         ground: '#17121F', ink: '#EEE8F7', accent: '#FF9EB0', mix: '54%' },
  { id: 'paper',    name: 'Butter Paper',      ground: '#FBF6E4', ink: '#141713', accent: '#1A7F4E', mix: '63%' },
];
// The first theme is the default: it has no data-theme attribute, the others set one.
export const defaultTheme = themes[0].id;
