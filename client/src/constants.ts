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

export const ERROR_MESSAGES = {
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
  '/login': 'Sign In',
  '/signup': 'Sign Up',
  '/mysize/edit': 'Edit Size',
  '/mysize/new': 'New Size',
  '/mypage': 'My Page'
}

// TODO: delete this!
export default {};
