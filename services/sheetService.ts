
/**
 * 구글 스프레드시트 연동 설정 가이드:
 * 1. 구글 시트 상단 메뉴 [확장 프로그램] -> [Apps Script] 클릭
 * 2. 제공된 GAS 코드를 붙여넣기
 * 3. [배포] 버튼 클릭 -> [새 배포] -> [웹 앱] 선택
 * 4. 설명 입력 / 다음 사용자로 실행: '나' / 액세스 권한: '모든 사용자'
 * 5. 생성된 '웹 앱 URL'을 아래 GOOGLE_SHEET_WEBAPP_URL에 넣기
 */

const GOOGLE_SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbyHl67t8gp5nIa0VYe-O44I7rdDVLR3ubSZVzjCMnt-Adks00-40Ioy8qSCNLQOocb5/exec';

export const submitOrderToSheet = async (data: any) => {
  console.log('Sheet로 주문 데이터 전송 시작...', data);
  
  if (!GOOGLE_SHEET_WEBAPP_URL || GOOGLE_SHEET_WEBAPP_URL.includes('your-webapp-url')) {
    console.error('GOOGLE_SHEET_WEBAPP_URL이 설정되지 않았습니다.');
    throw new Error('URL_NOT_CONFIGURED');
  }

  try {
    /**
     * 구글 앱스 스크립트(GAS)는 CORS Preflight(OPTIONS) 요청을 거부할 수 있으므로,
     * Content-Type을 'text/plain'으로 설정하여 브라우저의 'Simple Request' 모드를 사용합니다.
     */
    const response = await fetch(GOOGLE_SHEET_WEBAPP_URL, {
      method: 'POST',
      mode: 'no-cors', // 중요: CORS 에러 방지를 위해 no-cors 사용
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(data),
    });

    /**
     * 'no-cors' 모드에서는 브라우저가 응답 상태 코드를 노출하지 않지만(opaque), 
     * 네트워크 에러가 발생하지 않았다면 데이터가 전송된 것으로 간주합니다.
     */
    console.log('데이터 전송 완료 (Opaque Response)');
    return { result: "success" };
  } catch (error) {
    console.error('구글 시트 전송 중 네트워크 오류:', error);
    throw error;
  }
};
