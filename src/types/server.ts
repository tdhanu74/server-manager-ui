export type Server = {
  id: string;
  name: string;
  type: string;
  running: boolean;
  logs?: {
    id: string;
    log: string;
  }[];
};
