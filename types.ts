
export enum SchoolLevel {
  ALL = '전체',
  ELEMENTARY = '초등',
  MIDDLE = '중학',
  HIGH = '고등'
}

export interface Product {
  id: string;
  name: string;
  author: string;
  level: SchoolLevel;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  teacherCount: number;
  studentCount: number;
}

export type OrderStep = 'MAIN' | 'SELECTION' | 'QUOTATION' | 'INFO' | 'COMPLETE' | 'INQUIRY';

export interface OrderInfo {
  institution: string;
  name: string;
  phone: string;
  email: string;
  channel: string[];
  message: string;
  consent: boolean;
}

export interface InquiryInfo {
  type: string;
  orderNumber?: string;
  region: string;
  institution: string;
  name: string;
  phone: string;
  email: string;
  title: string;
  content: string;
  consent: boolean;
}
