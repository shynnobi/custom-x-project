import { HexadecimalColor } from '@interfaces/colorScheme';

export function adjustColor(
  color: HexadecimalColor,
  percent: number,
  channelOffset: { r?: number; g?: number; b?: number } = {}
): HexadecimalColor {
  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;

  const adjust = (channel: number, offset: number) =>
    Math.max(0, Math.min(255, channel + (channel * percent) / 100 + offset));

  const rAdjusted = adjust(r, channelOffset.r || 0);
  const gAdjusted = adjust(g, channelOffset.g || 0);
  const bAdjusted = adjust(b, channelOffset.b || 0);

  return (rAdjusted << 16) | (gAdjusted << 8) | bAdjusted;
}

export function darkenColor(
  color: HexadecimalColor,
  percent: number
): HexadecimalColor {
  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;

  const darken = (channel: number) =>
    Math.max(0, Math.min(255, channel - (channel * percent) / 100));

  const rDarkened = darken(r);
  const gDarkened = darken(g);
  const bDarkened = darken(b);

  return (rDarkened << 16) | (gDarkened << 8) | bDarkened;
}

export function lightenColor(
  color: HexadecimalColor,
  percent: number
): HexadecimalColor {
  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;

  const lighten = (channel: number) =>
    Math.max(0, Math.min(255, channel + (channel * percent) / 100));

  const rLightened = lighten(r);
  const gLightened = lighten(g);
  const bLightened = lighten(b);

  return (rLightened << 16) | (gLightened << 8) | bLightened;
}

export const convert0xToHex = (color: HexadecimalColor): string =>
  `#${color.toString(16).padStart(6, '0').toUpperCase()}`;
