export interface IMemo {
  id: string;
  title: string;
  text: string;
  createTime: string;
  lastModifiedTime: string
}

export interface ICreateMemo {
  title: string;
  text: string;
}

export interface IModifyMemo extends ICreateMemo {
  id: string;
}
