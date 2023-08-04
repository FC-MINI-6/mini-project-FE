export const resultModalDatas = {
  DAY_OFF_INSERT_SUCCESS: {
    title: '휴가 등록 완료',
    content: '휴가 등록을 완료했습니다.\n관리자의 승인을 기다려주세요!',
    type: 1,
    okButton: '확인'
  },
  DAY_OFF_INSERT_FAILUR: {
    title: '휴가 등록 실패',
    type: 1,
    okButton: '확인',
    okCallback: () => {}
  },
  DAY_OFF_FETCH_FAILURE: {
    title: '휴가 내역 조회 실패',
    content: '휴가 내역을 가져오는 중 오류가 발생했습니다.\n관리자에게 문의해주세요.',
    type: 1,
    okButton: '확인',
    okCallback: () => {}
  }
}
