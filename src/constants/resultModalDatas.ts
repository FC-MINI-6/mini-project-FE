export const resultModalDatas = {
  DAY_OFF_INSERT_SUCCESS: {
    title: '휴가 등록 완료',
    content: '휴가 등록을 완료했습니다.\n관리자의 승인을 기다려주세요!',
    type: 1,
    okButton: '확인'
  },
  DAY_OFF_INSERT_FAILURE: {
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
  },
  DAY_OFF_DAYS_VALIDATION: {
    title: '휴가 등록 오류',
    content:
      '신청할 수 있는 휴가일수를 초과했습니다.\n신청현황을 확인해주세요.\n신청 가능한 휴가일수 : ',
    type: 1,
    okButton: '확인'
  },
  DUTY_INSERT_SUCCESS: {
    title: '당직 등록 완료',
    content: '당직 등록을 완료했습니다.\n관리자의 승인을 기다려주세요!',
    type: 1,
    okButton: '확인'
  },
  DUTY_INSERT_FAILURE: {
    title: '당직 등록 실패',
    content: '휴가 등록 신청 중 오류가 발생했습니다.\n관리자에게 문의해주세요.\n',
    type: 1,
    okButton: '확인',
    okCallback: () => {}
  },
  DAYOFF_CANCEL_CONFIRM: {
    title: '휴가 신청 취소',
    content: '등록하신 휴가를 취소하시겠습니까?',
    type: 0,
    okButton: '확인',
    cancelButton: '닫기',
    cancelCallback: () => {}
  },
  DAYOFF_CANCEL_FAILURE: {
    title: '휴가 신청 취소 오류',
    content: '휴가 신청 취소 중 오류가 발생했습니다.\n관리자에게 문의해주세요.\n',
    type: 1,
    okButton: '확인',
    okCallback: () => {}
  },
  DUTY_CANCEL_CONFIRM: {
    title: '당직 신청 취소',
    content: '등록하신 당직을 취소하시겠습니까?',
    type: 0,
    okButton: '확인',
    cancelButton: '닫기',
    cancelCallback: () => {}
  },
  DUTY_CANCEL_FAILURE: {
    title: '당직 신청 취소 오류',
    content: '당직 신청 취소 중 오류가 발생했습니다.\n관리자에게 문의해주세요.\n',
    type: 1,
    okButton: '확인',
    okCallback: () => {}
  }
}
