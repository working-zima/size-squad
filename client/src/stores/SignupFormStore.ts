import { singleton } from "tsyringe";

import { Action, Store } from "usestore-ts";

import { apiService } from "../services/ApiService";
import { Summary, User } from "../types";
import { nullUser } from "../nullObject";

@singleton()
@Store()
class SignupFormStore {
  user: User = nullUser;

  passwordConfirmation = '';

  accessToken = '';

  error = false;

  loading = true;

  done = false;

  isEmailDuplicated = false;

  isEmailValid = false;

  isNameDuplicated = false;

  isNameValid = false;

  isPasswordValid = false;

  isPasswordConfirmationValid = false;

  get valid() {
    return this.isEmailValid
      && !this.isEmailDuplicated
      && this.isNameValid
      && !this.isNameDuplicated
      && this.isPasswordValid
      && this.isPasswordConfirmationValid
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
    console.log(email)
    this.validateEmail(email);
    if(this.isEmailValid) {
      try {
        const isDuplicated = await apiService.checkUserEmail({ email });
        this.changeIsEmailDuplicated(!!isDuplicated);
      } catch(error) {
        this.setError();
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
    if(this.isNameValid) {
      try {
        const isDuplicated = await apiService.checkUserName({ name });
        this.changeIsNameDuplicated(!!isDuplicated);
      } catch(error) {
        this.setError();
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
  validatePasswordConfirmation(passwordConfirmation: string) {
    this.isPasswordConfirmationValid =
      this.user.password === passwordConfirmation;
  }

  @Action()
  changeEmail(email: string) {
    this.user = {...this.user, email};
  }

  @Action()
  changeName(name: string) {
    this.user = {...this.user, name};
  }

  @Action()
  changePassword(password: string) {
    this.user = {...this.user, password};
  }

  @Action()
  changePasswordConfirmation(password: string) {
    this.passwordConfirmation = password;
  }

  @Action()
  changeGender(gender: Summary) {
    this.user = {...this.user, gender};
  }

  @Action()
  changeHeight(height: number) {
    this.user = {...this.user, height};
  }

  @Action()
  changeWeight(weight: number) {
    this.user = {...this.user, weight};
  }

  @Action()
  changeDescription(description: string) {
    this.user = {...this.user, description};
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
  private setError() {
    this.error = true;
  }

  @Action()
  reset() {
    this.user = nullUser;
    this.passwordConfirmation = '';
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
  }

  async signup() {
    try {
      const accessToken = await apiService.signup({
        ...this.user,
        gender: this.user.gender?._id || '',
      });
      this.setAccessToken(accessToken);
    } catch (error) {
      this.setError();
    }
  }
}

export default SignupFormStore;
