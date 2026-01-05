
import { SchoolLevel, Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: '영어 3 (김혜리)', author: '김혜리', level: SchoolLevel.ELEMENTARY, price: 44250, image: 'https://picsum.photos/seed/eng3/300/400' },
  { id: '2', name: '영어 4 (김혜리)', author: '김혜리', level: SchoolLevel.ELEMENTARY, price: 44250, image: 'https://picsum.photos/seed/eng4/300/400' },
  { id: '3', name: '영어 1 (박준언)', author: '박준언', level: SchoolLevel.MIDDLE, price: 44250, image: 'https://picsum.photos/seed/mid1/300/400' },
  { id: '4', name: '영어 2 (박준언)', author: '박준언', level: SchoolLevel.MIDDLE, price: 44250, image: 'https://picsum.photos/seed/mid2/300/400' },
  { id: '5', name: '수학 1 (최창우)', author: '최창우', level: SchoolLevel.HIGH, price: 44250, image: 'https://picsum.photos/seed/high1/300/400' },
  { id: '6', name: '수학 2 (최창우)', author: '최창우', level: SchoolLevel.HIGH, price: 44250, image: 'https://picsum.photos/seed/high2/300/400' },
];

export const DISCOUNT_CODE = 'DX253G';
export const DISCOUNT_AMOUNT = 5000000;

export const DOCUMENTS = [
  { id: '1', name: '사업자 등록증 사본' },
  { id: '2', name: '통장 사본' },
  { id: '3', name: 'AIDT 소개 자료 (초등)' },
  { id: '4', name: 'AIDT 소개 자료 (중학)' },
  { id: '5', name: 'AIDT 소개 자료 (고등)' },
];
