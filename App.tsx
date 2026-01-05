
import React, { useState, useMemo } from 'react';
import { ShoppingCart, CheckCircle, ChevronRight, X, Download, FileText, Mail, Info, HelpCircle, Phone, Loader2 } from 'lucide-react';
import { SchoolLevel, Product, CartItem, OrderStep, OrderInfo, InquiryInfo } from './types';
import { MOCK_PRODUCTS, DISCOUNT_CODE, DISCOUNT_AMOUNT, DOCUMENTS } from './constants';
import { submitOrderToSheet } from './services/sheetService';

// --- Header & Footer ---
const Header = () => (
  <header className="bg-white border-b sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">Y</div>
        <span className="text-xl font-bold tracking-tight text-slate-800">YBM AI Digital</span>
      </div>
      <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
        <a href="#" className="hover:text-blue-600 transition-colors">서비스 소개</a>
        <a href="#" className="hover:text-blue-600 transition-colors">이용 안내</a>
        <a href="#" className="hover:text-blue-600 transition-colors">고객센터</a>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-[#f8f9fa] text-[#666] py-10 border-t border-slate-200 text-[13px]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 font-semibold text-slate-700">
        <a href="#" className="hover:underline">이용약관</a>
        <span className="text-slate-300">|</span>
        <a href="#" className="hover:underline text-blue-600 font-bold">개인정보처리방침</a>
        <span className="text-slate-300">|</span>
        <a href="#" className="hover:underline">이메일무단수집거부</a>
      </div>
      
      <div className="space-y-1 leading-relaxed">
        <p>(주)와이비엠 서울특별시 종로구 종로 98 (대표이사 : 허문호)</p>
        <p>사업자등록번호 : 101-81-14655 통신판매업신고번호 : 제 01-285호</p>
        <div className="flex flex-wrap gap-x-4">
          <p>고객센터 : 02-2000-0599</p>
          <p>이메일 : ybmcloud@ybm.co.kr</p>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400">Copyright ⓒ (주)YBM. All rights reserved.</p>
        <div className="flex items-center gap-4 opacity-50 grayscale">
          <div className="font-black text-lg">YBM</div>
        </div>
      </div>
    </div>
  </footer>
);

// --- Components ---
const Stepper = ({ currentStep }: { currentStep: number }) => {
  const steps = ["교육자료 선택", "견적 확인", "주문정보 입력", "주문 완료"];
  return (
    <div className="flex items-center justify-center space-x-4 mb-10 overflow-x-auto py-2">
      {steps.map((step, idx) => (
        <React.Fragment key={step}>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              idx + 1 <= currentStep ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              {idx + 1}
            </div>
            <span className={`ml-2 text-sm font-semibold whitespace-nowrap ${
              idx + 1 <= currentStep ? 'text-blue-600' : 'text-slate-400'
            }`}>
              {step}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`w-8 h-px ${idx + 1 < currentStep ? 'bg-blue-600' : 'bg-slate-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// --- Page Components ---
const LandingPage = ({ setStep }: { setStep: (s: OrderStep) => void }) => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12">
    <div className="relative mb-10">
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
        YBM AI <span className="text-blue-600">디지털 교육자료</span>
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        미래형 학습을 실현하는 인공지능 기반 AIDT 교육자료를<br className="hidden md:block" />
        가장 쉽고 빠르게 주문하세요.
      </p>
    </div>

    <button 
      onClick={() => setStep('SELECTION')}
      className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-200 mb-16"
    >
      AI 디지털 교육자료 주문서 작성하기
    </button>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl mb-12">
      {[
        { id: 'info', icon: <Info className="w-5 h-5 text-blue-500" />, label: 'AI 디지털 교육자료 안내', target: 'MAIN' as const },
        { id: 'sample', icon: <FileText className="w-5 h-5 text-green-500" />, label: 'AIDT 체험하기', target: 'MAIN' as const },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setStep(item.target)}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex items-center justify-center gap-3 group"
        >
          <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
            {item.icon}
          </div>
          <span className="font-bold text-slate-700 text-sm">{item.label}</span>
        </button>
      ))}
    </div>

    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-200 text-slate-500">
      <Phone className="w-4 h-4 text-blue-600" />
      <span className="text-[13px] font-semibold">문의하기: 02-2000-0599</span>
    </div>
  </div>
);

const SelectionPage = ({ 
  cart, 
  onAddToCart, 
  onRemoveFromCart, 
  onNext 
}: { 
  cart: CartItem[], 
  onAddToCart: (p: Product) => void, 
  onRemoveFromCart: (id: string) => void,
  onNext: () => void
}) => {
  const [filter, setFilter] = useState<SchoolLevel>(SchoolLevel.ALL);

  const filteredProducts = useMemo(() => {
    if (filter === SchoolLevel.ALL) return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => p.level === filter);
  }, [filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
            {[SchoolLevel.ALL, SchoolLevel.ELEMENTARY, SchoolLevel.MIDDLE, SchoolLevel.HIGH].map(lvl => (
              <button
                key={lvl}
                onClick={() => setFilter(lvl)}
                className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  filter === lvl ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => {
              const inCart = cart.some(item => item.id === product.id);
              return (
                <div key={product.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all flex flex-col">
                  <div className="aspect-[3/4] overflow-hidden relative group bg-slate-100">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-2 left-2">
                      <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        {product.level}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <h3 className="font-bold text-sm text-slate-800 mb-0.5 truncate">{product.name}</h3>
                    <p className="text-slate-400 text-[11px] mb-3">저자: {product.author}</p>
                    <div className="mt-auto flex flex-col gap-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-blue-600 text-xs">44,250원</span>
                        <span className="text-[9px] text-slate-300">(1COPY/VAT포함)</span>
                      </div>
                      <button
                        onClick={() => inCart ? onRemoveFromCart(product.id) : onAddToCart(product)}
                        className={`w-full py-1.5 rounded-lg font-bold text-xs transition-all ${
                          inCart 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                        }`}
                      >
                        {inCart ? '✓ 담김' : '+ 담기'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sticky top-24">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-base flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-blue-600" />
                장바구니
              </h2>
              <span className="bg-blue-100 text-blue-600 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="py-10 text-center text-slate-400">
                <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-10" />
                <p className="text-xs">선택한 교육자료가 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-3 mb-6 max-h-[350px] overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 p-2 rounded-lg bg-slate-50 group border border-slate-100">
                    <img src={item.image} className="w-10 h-14 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] text-blue-600 font-bold uppercase">{item.level}</span>
                        <button onClick={() => onRemoveFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="text-xs font-bold truncate pr-1">{item.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={onNext}
              disabled={cart.length === 0}
              className="w-full py-3 bg-blue-600 disabled:bg-slate-200 text-white text-sm font-bold rounded-xl transition-all hover:bg-blue-700 active:scale-95"
            >
              다음 단계로
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

const QuotationPage = ({ 
  cart, 
  updateQuantity, 
  onNext, 
  onPrev,
}: { 
  cart: CartItem[], 
  updateQuantity: (id: string, type: 'teacher' | 'student', val: number) => void,
  onNext: () => void,
  onPrev: () => void,
}) => {
  const subTotal = cart.reduce((acc, item) => acc + (item.price * (item.teacherCount + item.studentCount)), 0);
  const discountAmount = Math.floor(subTotal * 0.1);
  const finalTotal = subTotal - discountAmount;

  const downloadPDF = () => {
    alert('견적서 PDF를 생성하고 다운로드합니다.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">견적 확인</h2>
          <button onClick={downloadPDF} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
            <Download className="w-4 h-4" />
            견적서 PDF 다운로드
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-8 py-4">교육자료명</th>
                <th className="px-4 py-4">저자</th>
                <th className="px-4 py-4 text-center">교사 계정수</th>
                <th className="px-4 py-4 text-center">학생 계정수</th>
                <th className="px-8 py-4 text-right">금액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cart.map(item => (
                <tr key={item.id} className="text-sm">
                  <td className="px-8 py-6 font-bold text-slate-800">{item.name}</td>
                  <td className="px-4 py-6 text-slate-600">{item.author}</td>
                  <td className="px-4 py-6">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => updateQuantity(item.id, 'teacher', -1)} className="w-6 h-6 border rounded flex items-center justify-center hover:bg-slate-50">-</button>
                      <span className="w-6 text-center">{item.teacherCount}</span>
                      <button onClick={() => updateQuantity(item.id, 'teacher', 1)} className="w-6 h-6 border rounded flex items-center justify-center hover:bg-slate-50">+</button>
                    </div>
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => updateQuantity(item.id, 'student', -1)} className="w-6 h-6 border rounded flex items-center justify-center hover:bg-slate-50">-</button>
                      <span className="w-6 text-center">{item.studentCount}</span>
                      <button onClick={() => updateQuantity(item.id, 'student', 1)} className="w-6 h-6 border rounded flex items-center justify-center hover:bg-slate-50">+</button>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right font-semibold">
                    ₩ {(item.price * (item.teacherCount + item.studentCount)).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 space-y-4">
          <div className="flex justify-between text-slate-600 font-medium">
            <span>소계</span>
            <span>₩ {subTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-red-500 font-bold items-center">
            <span className="flex items-center gap-2">
              자동 할인 (10%)
              <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full">EVENT</span>
            </span>
            <span>- ₩ {discountAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <span className="text-lg font-bold">최종 금액</span>
            <span className="text-2xl font-black text-blue-600">₩ {Math.max(0, finalTotal).toLocaleString()}</span>
          </div>
        </div>

        <div className="p-8">
          <div className="flex gap-4">
            <button onClick={onPrev} className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors">이전</button>
            <button onClick={onNext} className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95">다음</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoPage = ({ 
  orderInfo, 
  setOrderInfo, 
  onSubmit, 
  onPrev,
  isSubmitting
}: { 
  orderInfo: OrderInfo, 
  setOrderInfo: React.Dispatch<React.SetStateAction<OrderInfo>>,
  onSubmit: () => void,
  onPrev: () => void,
  isSubmitting: boolean
}) => {
  const isFormValid = orderInfo.institution && orderInfo.name && orderInfo.phone && orderInfo.email && orderInfo.channel.length > 0 && orderInfo.consent;

  const handleChannelToggle = (ch: string) => {
    setOrderInfo(prev => ({
      ...prev,
      channel: prev.channel.includes(ch) ? prev.channel.filter(c => c !== ch) : [...prev.channel, ch]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12">
        <h2 className="text-2xl font-bold mb-10 text-center">주문 정보 입력</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">* 학교(기관)명</label>
              <input 
                type="text" 
                placeholder="학교(기관)명을 입력해주세요." 
                value={orderInfo.institution}
                onChange={e => setOrderInfo({...orderInfo, institution: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">* 담당자 이름</label>
              <input 
                type="text" 
                placeholder="이름을 입력해주세요." 
                value={orderInfo.name}
                onChange={e => setOrderInfo({...orderInfo, name: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">* 담당자 연락처</label>
              <input 
                type="text" 
                placeholder="연락처를 입력해주세요." 
                value={orderInfo.phone}
                onChange={e => setOrderInfo({...orderInfo, phone: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">* 담당자 이메일</label>
              <input 
                type="email" 
                placeholder="이메일을 입력해주세요." 
                value={orderInfo.email}
                onChange={e => setOrderInfo({...orderInfo, email: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">* 계약희망채널</label>
              <div className="flex flex-col gap-3">
                {['학교장터 (에듀테크몰)', '나라장터 (디지털서비스몰)', '미정(협의 필요)'].map(ch => (
                  <label key={ch} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={orderInfo.channel.includes(ch)}
                      onChange={() => handleChannelToggle(ch)}
                      className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">{ch}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-sm mb-4">개인정보 수집 및 이용에 대한 동의</h3>
              <ul className="text-xs text-slate-500 space-y-2 mb-6 leading-relaxed">
                <li>• 수집항목 : 학교(기관명), 이름, 연락처, 이메일</li>
                <li>• 보유 및 이용 기간 : 계약 종료 후 6개월 이내 파기</li>
                <li>• 수집 및 이용 목적 : AIDT 견적 산정 및 계약</li>
                <li>• 제공받는 기관 : ㈜와이비엠</li>
              </ul>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={orderInfo.consent}
                  onChange={e => setOrderInfo({...orderInfo, consent: e.target.checked})}
                  className="w-5 h-5 rounded border-slate-300 text-blue-600" 
                />
                <span className="text-sm font-bold text-slate-700">동의합니다.</span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">요청사항 (선택)</label>
              <textarea 
                rows={5}
                placeholder="요청 내용을 작성해주세요." 
                value={orderInfo.message}
                onChange={e => setOrderInfo({...orderInfo, message: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
              />
              <p className="text-right text-[10px] text-slate-400">{orderInfo.message.length} / 500 byte</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <button onClick={onPrev} disabled={isSubmitting} className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50">이전</button>
          <button 
            disabled={!isFormValid || isSubmitting}
            onClick={onSubmit}
            className="flex-1 py-4 bg-blue-600 disabled:bg-slate-200 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                처리 중...
              </>
            ) : '주문 요청'}
          </button>
        </div>
      </div>
    </div>
  );
};

const CompletePage = ({ setStep, orderId }: { setStep: (s: OrderStep) => void, orderId: string }) => {
  const [showDocs, setShowDocs] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">주문이 접수되었습니다!</h2>
        <div className="inline-block bg-slate-100 px-6 py-2 rounded-full text-blue-600 font-bold text-sm border border-slate-200">
          주문번호 {orderId}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 max-w-2xl mx-auto mb-12">
        <p className="text-slate-600 leading-relaxed mb-8">
          빠른 시일 내 기재해주신 이메일 또는 연락처로 연락드리겠습니다.<br />
          계약 진행을 위해 필요한 기타 서류(사업자 등록증 등)는<br />
          아래 ‘서류 다운로드’를 클릭하여 먼저 다운로드 받으실 수 있습니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setShowDocs(true)}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-all"
          >
            <Download className="w-5 h-5" />
            서류 다운로드
          </button>
          <button 
            onClick={() => setStep('MAIN')}
            className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
          >
            메인으로 돌아가기
          </button>
        </div>
      </div>

      {showDocs && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowDocs(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold mb-2">서류 다운로드</h3>
            <p className="text-sm text-slate-500 mb-8">계약 진행을 위해 필요한 서류를 선택하여 다운로드 받으세요.</p>
            
            <div className="space-y-3 mb-10">
              {DOCUMENTS.map(doc => (
                <label key={doc.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 cursor-pointer group bg-slate-50">
                  <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">{doc.name}</span>
                </label>
              ))}
            </div>

            <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
              <Download className="w-5 h-5" />
              다운로드
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const InquiryPage = ({ onBack }: { onBack: () => void }) => {
  const [inquiry, setInquiry] = useState<InquiryInfo>({
    type: '선택',
    region: '',
    institution: '',
    name: '',
    phone: '',
    email: '',
    title: '',
    content: '',
    consent: false
  });

  const handleSubmit = () => {
    alert('문의가 등록되었습니다. 빠른 시일 내에 답변드리겠습니다.');
    onBack();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-8 text-blue-600 font-bold cursor-pointer hover:underline" onClick={onBack}>
        <ChevronRight className="w-5 h-5 rotate-180" />
        돌아가기
      </div>
      <h1 className="text-3xl font-black mb-10 tracking-tight">AI 디지털 교육자료 문의하기</h1>
      
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border-b border-slate-200">
          <div className="bg-slate-50 p-6 flex items-center gap-4">
            <span className="text-sm font-bold w-24">문의 유형</span>
            <select 
              className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
              value={inquiry.type}
              onChange={e => setInquiry({...inquiry, type: e.target.value})}
            >
              <option>선택</option>
              <option>주문 관련</option>
              <option>계약 문의</option>
              <option>자료 문의</option>
              <option>기타</option>
            </select>
          </div>
          <div className="bg-slate-50 p-6 flex items-center gap-4">
            <span className="text-sm font-bold w-24">주문 번호</span>
            <input 
              type="text" 
              placeholder="주문 시 발급받은 번호" 
              className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" 
              value={inquiry.orderNumber}
              onChange={e => setInquiry({...inquiry, orderNumber: e.target.value})}
            />
          </div>
          <div className="bg-white p-6 flex items-center gap-4">
            <span className="text-sm font-bold w-24">지역</span>
            <input type="text" className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={inquiry.region} onChange={e => setInquiry({...inquiry, region: e.target.value})}/>
          </div>
          <div className="bg-white p-6 flex items-center gap-4">
            <span className="text-sm font-bold w-24">기관(학교)명</span>
            <input type="text" className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={inquiry.institution} onChange={e => setInquiry({...inquiry, institution: e.target.value})}/>
          </div>
          <div className="bg-slate-50 p-6 flex items-center gap-4">
            <span className="text-sm font-bold w-24">이름</span>
            <input type="text" className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={inquiry.name} onChange={e => setInquiry({...inquiry, name: e.target.value})}/>
          </div>
          <div className="bg-slate-50 p-6 flex items-center gap-4">
            <span className="text-sm font-bold w-24">연락처</span>
            <input type="text" className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={inquiry.phone} onChange={e => setInquiry({...inquiry, phone: e.target.value})}/>
          </div>
        </div>
        <div className="p-6 bg-white border-b border-slate-200">
           <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-bold w-24">이메일</span>
            <input type="email" className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={inquiry.email} onChange={e => setInquiry({...inquiry, email: e.target.value})}/>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-bold w-24">제목</span>
            <input type="text" className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={inquiry.title} onChange={e => setInquiry({...inquiry, title: e.target.value})}/>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-sm font-bold w-24 mt-2">내용</span>
            <textarea rows={6} className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none" value={inquiry.content} onChange={e => setInquiry({...inquiry, content: e.target.value})}></textarea>
          </div>
        </div>

        <div className="p-10 bg-slate-50 text-center space-y-8">
           <div className="inline-block bg-white p-6 rounded-2xl border border-slate-200 text-left max-w-lg">
             <h4 className="font-bold text-sm mb-4">개인정보 수집 및 이용 동의</h4>
             <p className="text-xs text-slate-500 leading-relaxed mb-6">수집된 개인정보는 문의 답변 및 고객 지원 서비스 목적으로만 사용되며, 동의 철회 시 즉시 파기됩니다.</p>
             <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={inquiry.consent} onChange={e => setInquiry({...inquiry, consent: e.target.checked})} className="w-5 h-5 rounded border-slate-300 text-blue-600" />
              <span className="text-sm font-bold text-slate-700">동의합니다.</span>
            </label>
           </div>
           
           <div>
             <button 
              disabled={!inquiry.consent}
              onClick={handleSubmit}
              className="px-12 py-4 bg-slate-800 disabled:bg-slate-300 text-white font-bold rounded-xl hover:bg-slate-900 transition-all active:scale-95 shadow-lg shadow-slate-100"
             >
               문의 등록하기
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [step, setStep] = useState<OrderStep>('MAIN');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    institution: '',
    name: '',
    phone: '',
    email: '',
    channel: [],
    message: '',
    consent: false
  });
  const [lastOrderId, setLastOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, { ...product, teacherCount: 1, studentCount: 1 }]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, type: 'teacher' | 'student', delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        if (type === 'teacher') return { ...item, teacherCount: Math.max(1, item.teacherCount + delta) };
        return { ...item, studentCount: Math.max(1, item.studentCount + delta) };
      }
      return item;
    }));
  };

  const handleSubmitOrder = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    const orderId = `ORD-25-${Math.floor(Math.random() * 9000 + 1000)}`;
    setLastOrderId(orderId);
    
    const subTotal = cart.reduce((acc, item) => acc + (item.price * (item.teacherCount + item.studentCount)), 0);
    const discountAmount = Math.floor(subTotal * 0.1);
    const finalTotal = subTotal - discountAmount;
    
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const finalData = {
      orderNumber: orderId,
      institution: orderInfo.institution,
      name: orderInfo.name,
      phone: orderInfo.phone,
      email: orderInfo.email,
      channel: orderInfo.channel.join(', '),
      products: cart.map(item => item.name).join(', '),
      quantities: cart.map(item => `${item.name}(교:${item.teacherCount},학:${item.studentCount})`).join(', '),
      subTotal: subTotal,
      discount: discountAmount,
      finalTotal: Math.max(0, finalTotal),
      timestamp: formattedDate
    };

    try {
      await submitOrderToSheet(finalData);
      setStep('COMPLETE');
      setCart([]);
    } catch (err) {
      alert('주문 처리 중 오류가 발생했습니다. 구글 시트 권한 설정을 확인해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    switch (step) {
      case 'MAIN': return <LandingPage setStep={setStep} />;
      case 'SELECTION': return (
        <>
          <Stepper currentStep={1} />
          <SelectionPage 
            cart={cart} 
            onAddToCart={handleAddToCart} 
            onRemoveFromCart={handleRemoveFromCart} 
            onNext={() => setStep('QUOTATION')} 
          />
        </>
      );
      case 'QUOTATION': return (
        <>
          <Stepper currentStep={2} />
          <QuotationPage 
            cart={cart} 
            updateQuantity={updateQuantity} 
            onNext={() => setStep('INFO')} 
            onPrev={() => setStep('SELECTION')} 
          />
        </>
      );
      case 'INFO': return (
        <>
          <Stepper currentStep={3} />
          <InfoPage 
            orderInfo={orderInfo} 
            setOrderInfo={setOrderInfo} 
            onPrev={() => setStep('QUOTATION')} 
            onSubmit={handleSubmitOrder} 
            isSubmitting={isSubmitting}
          />
        </>
      );
      case 'COMPLETE': return (
        <>
          <Stepper currentStep={4} />
          <CompletePage setStep={setStep} orderId={lastOrderId} />
        </>
      );
      case 'INQUIRY': return <InquiryPage onBack={() => setStep('MAIN')} />;
      default: return <LandingPage setStep={setStep} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}
