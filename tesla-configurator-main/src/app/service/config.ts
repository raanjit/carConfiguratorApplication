export interface Config {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}
export interface ConfigList {
  configs: Config[];
  towHitch: boolean;
  yoke: boolean;
}
