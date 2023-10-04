export interface ILink {
  _id: string;
  url: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  __v: string;
}

export interface IShowButtons extends ILink {
  showButtons?: boolean;
}
