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
  },
  FETCH_USER_LIST_FAILURE: {
    title: '사용자 조회 오류',
    content: '일정 정보를 가져오는 중 오류가 발생했습니다.\n관리자에게 문의해주세요.\n',
    type: 1,
    okButton: '확인',
    okCallback: () => {}
  },
  FETCH_SCHEDULES_FAILURE: {
    title: '일정 조회 오류',
    content: '일정 정보를 가져오는 중 오류가 발생했습니다.\n관리자에게 문의해주세요.\n',
    type: 1,
    okButton: '확인',
    okCallback: () => {}
  },
  LOGOUT_CONFIRM: {
    title: '로그아웃',
    content: '로그아웃하시겠습니까?',
    type: 0,
    okButton: '로그아웃',
    cancelButton: '취소',
    cancelCallback: () => {}
  },
  LOGIN_FAILURE: {
    title: '로그인 실패',
    content: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
    type: 1,
    okButton: '확인',
    okCallback: () => {}
  },
  SIGNUP_FAILURE: {
    title: '회원가입 실패',
    content: '회원가입에 실패했습니다. 정보를 확인해주세요.',
    type: 1,
    okButton: '확인',
    okCallback: () => {}
  },
  SIGNUP_SUCCESS: {
    title: '회원가입 성공',
    content: '회원가입에 성공했습니다. 로그인을 진행해주세요.',
    type: 1,
    okButton: '확인',
    okCallback: () => {}
  },
  EDIT_PASSWORD_SUCCESS: {
    title: '비밀번호 변경 완료',
    content: '비밀번호 변경에 성공했습니다.',
    type: 1,
    okButton: '확인',
    okCallback: () => {}
  },
  EDIT_PASSWORD_FAILURE: {
    title: '비밀번호 변경 실패',
    content: '비밀번호 변경에 실패했습니다.',
    type: 1,
    okButton: '확인',
    okCallback: () => {}
  },
  EDIT_PHONENUMBER_SUCCESS: {
    title: '전화번호 변경 성공',
    content: '전화번호 변경에 성공했습니다.',
    type: 1,
    okButton: '확인',
    okCallback: () => {}
  },
  EDIT_PHONENUMBER_FAILURE: {
    title: '전화번호 변경 실패',
    content: '전화번호 변경에 실패했습니다.',
    type: 1,
    okButton: '확인',
    okCallback: () => {}
  }
}

