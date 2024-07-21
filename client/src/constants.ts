export const MEASUREMENT_MESSAGES: Record<string, string> = {
  totalLength: '총장',
  shoulderWidth: '어깨너비',
  chestWidth: '가슴너비',
  sleeveLength: '소매길이',
  waistWidth: '허리단면',
  hipWidth: '엉덩이단면',
  thighWidth: '허벅지단면',
  rise: '밑위',
  hemWidth: '밑단단면',
};

export const GENDER_MESSAGES: Record<string, string> = {
  male: '남성',
  female: '여성',
};

export const CATEGORY_MESSAGES: Record<string, string> = {
  tops: '상의',
  outwears: '아우터',
  pants: '바지',
  dresses: '원피스',
  skirts: '스커트',
};

export const FIT_MESSAGES: Record<string, string> = {
  skinny: '스키니',
  slim: '슬림',
  regular: '레귤러',
  relaxed: '루즈',
  oversized: '오버',
};


export const SUBCATEGORY_MESSAGES: Record<string, string> = {
  shortSleeves: '반소매 상의',
  longSleeves: '긴소매 상의',
  longOutwears: '롱 아우터',
  midiOutwears: '미디 아우터',
  shortOutwears: '숏 아우터',
  longPants: '긴바지',
  shorts: '반바지',
  miniSkirts: '미니 스커트',
  midiSkirts: '미디 스커트',
  longSkirts: '롱 스커트',
  miniDresses: '미니 원피스',
  midiDresses: '미디 원피스',
  maxiDresses: '맥시 원피스',
};

export const ERROR_MESSAGES: Record<string, string> = {
  EMAIL_EMPTY_MESSAGE: '이메일을 입력해주세요.',
  EMAIL_DUPLICATED_MESSAGE: '이미 사용된 이메일입니다.',
  EMAIL_INVALID_MESSAGE: '유효하지 않은 이메일입니다.',
  NAME_EMPTY_MESSAGE: '닉네임을 입력해주세요.',
  NAME_DUPLICATED_MESSAGE: '이미 사용된 닉네임입니다.',
  NAME_INVALID_MESSAGE: '한글, 영문, 숫자로 된 2 ~ 10자리를 입력해주세요.',
  PASSWORD_INVALID_MESSAGE: '영문, 숫자, 특수문자 포함한 8 ~ 16자리를 입력해주세요.',
  PASSWORD_EMPTY_MESSAGE: '비밀번호를 입력해주세요.',
  CONFIRM_INVALID_MESSAGE: '비밀번호와 일치하지 않습니다.',
}

type Titles = {
  [key: string]: string;
};

export const TITLE: Titles = {
  '/': 'Size Squad',
  '/mysize': 'Size Squad',
  '/login': '로그인',
  '/signup': '회원가입',
  '/mysize/edit': '사이즈 수정',
  '/mysize/new': '사이즈 등록',
  '/mypage': 'My Page'
}

// TODO: delete this!
export default {};
