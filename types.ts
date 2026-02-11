
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface User {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: number;
}

export interface PdfFile {
  id: string;
  name: string;
  base64: string;
  ownerId: string;
  ownerName: string;
  comments?: Comment[];
}

export enum AppStatus {
  IDLE = 'idle',
  AUTH_REQUIRED = 'auth_required',
  UPLOADING = 'uploading',
  ERROR = 'error'
}
