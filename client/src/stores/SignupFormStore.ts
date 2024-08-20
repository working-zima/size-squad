import { singleton } from "tsyringe";

import { Action, Store } from "usestore-ts";

import { Summary, User } from "../types";

import { apiService } from "../services/ApiService";

import { nullUser } from "../nullObject";

@singleton()
@Store()
class SignupFormStore {
  user: User = nullUser;

  oldPassword = '';

  passwordConfirmation = '';

  accessToken = '';

  errorMessage = '';

  error = false;

  loading = true;

  done = false;

  isEmailDuplicated = false;

  isEmailValid = false;

  isNameDuplicated = false;

  isNameValid = false;

  isPasswordValid = false;

  isOldPasswordValid = false;

  isPasswordConfirmationValid = false;

  // 유효성 검사
  get valid() {
    return this.isEmailValid
      && !this.isEmailDuplicated
      && this.isNameValid
      && !this.isNameDuplicated
      && this.isPasswordValid
      && this.isPasswordConfirmationValid
  }

  get EditPasswordValid() {
    return this.isOldPasswordValid
      && this.isPasswordValid
      && this.isPasswordConfirmationValid
  }

  get HeightValid() {
    return !(this.user.height === 0)
  }

  get WeightValid() {
    return !(this.user.weight === 0)
  }

  get DescriptionValid() {
    return !(this.user.description.trim() === '')
  }

  private emailValidation = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  @Action()
  validateEmail(email: string) {
    this.isEmailValid = this.emailValidation(email);
  }

  async validateAndCheckEmail(email: string) {
    this.validateEmail(email);
    if (this.isEmailValid) {
      try {
        const isDuplicated = await apiService.checkUserEmail({ email });
        this.changeIsEmailDuplicated(!!isDuplicated);
      } catch (error) {
        const typedError = error as { message: string };
        this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

        this.setError()
      }
    } else {
      this.changeIsEmailDuplicated(false);
    }
  }

  private nameValidation = (name: string) => {
    const nameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
    return nameRegex.test(name)
  }

  @Action()
  validateName(name: string) {
    this.isNameValid = this.nameValidation(name);
  }

  async validateAndCheckName(name: string) {
    this.validateName(name);
    if (this.isNameValid) {
      try {
        const isDuplicated = await apiService.checkUserName({ name });
        this.changeIsNameDuplicated(!!isDuplicated);
      } catch (error) {
        const typedError = error as { message: string };
        this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

        this.setError()
      }
    } else {
      this.changeIsNameDuplicated(false);
    }
  }

  private passwordValidation = (password: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,16}$/
    return passwordRegex.test(password)
  }

  @Action()
  validatePassword(password: string) {
    this.isPasswordValid = this.passwordValidation(password);
  }

  @Action()
  validateOldPassword(password: string) {
    this.isOldPasswordValid = this.passwordValidation(password);
  }

  @Action()
  validatePasswordConfirmation(passwordConfirmation: string) {
    this.isPasswordConfirmationValid =
      this.user.password === passwordConfirmation;
  }

  // 상태 변경
  @Action()
  changeEmail(email: string) {
    this.user = { ...this.user, email };
  }

  @Action()
  changeName(name: string) {
    this.user = { ...this.user, name };
  }

  @Action()
  changeOldPassword(password: string) {
    this.oldPassword = password;
  }

  @Action()
  changePassword(password: string) {
    this.user = { ...this.user, password };
  }

  @Action()
  changePasswordConfirmation(password: string) {
    this.passwordConfirmation = password;
  }

  @Action()
  changeGender(gender: Summary) {
    this.user = { ...this.user, gender };
  }

  @Action()
  changeHeight(height: number) {
    this.user = { ...this.user, height };
  }

  @Action()
  changeWeight(weight: number) {
    this.user = { ...this.user, weight };
  }

  @Action()
  changeDescription(description: string) {
    this.user = { ...this.user, description };
  }

  @Action()
  changeIsEmailDuplicated(isEmailDuplicated: boolean) {
    this.isEmailDuplicated = isEmailDuplicated;
  }

  @Action()
  changeIsNameDuplicated(isNameDuplicated: boolean) {
    this.isNameDuplicated = isNameDuplicated;
  }

  @Action()
  private setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  @Action()
  reset() {
    this.user = nullUser;
    this.passwordConfirmation = '';
    this.oldPassword = '';
    this.accessToken = '';

    this.error = false;
    this.loading = false;
    this.done = false;

    this.isNameDuplicated = false;
    this.isEmailValid = false;
    this.isNameDuplicated = false;
    this.isNameValid = false;
    this.isPasswordValid = false;
    this.isPasswordConfirmationValid = false;
    this.isOldPasswordValid = false;
  }

  @Action()
  private setError() {
    this.user = nullUser;
    this.passwordConfirmation = '';
    this.oldPassword = '';
    this.loading = false;
    this.error = true;
  }

  async signup() {
    try {
      const accessToken = await apiService.signup({
        ...this.user,
        gender: this.user.gender?._id || '',
      });
      this.setAccessToken(accessToken);
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError()
    }
  }

  async updatePassword() {
    try {
      await apiService.updatePassword({
        oldPassword: this.oldPassword,
        newPassword: this.user.password
      })

      this.reset();
    } catch (error) {
      const typedError = error as { status?: number; message: string };
      if (typedError.status === 400) this.errorMessage = '현재 비밀번호가 맞지 않습니다.'
      else this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError()
      throw error
    }
  }

  async updateGender() {
    try {
      await apiService.updateGender({
        gender: this.user.gender
      })

      this.reset();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError()
    }
  }

  async updateHeight() {
    try {
      await apiService.updateHeight({
        height: this.user.height
      })

      this.reset();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError()
    }
  }

  async updateWeight() {
    try {
      await apiService.updateWeight({
        weight: this.user.weight
      })

      this.reset();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError()
    }
  }

  async updateDescription() {
    try {
      await apiService.updateDescription({
        description: this.user.description
      })

      this.reset();
    } catch (error) {
      const typedError = error as { message: string };
      this.errorMessage = typedError.message || '예기치 못한 오류가 발생했습니다.'

      this.setError()
    }
  }
}

export default SignupFormStore;
