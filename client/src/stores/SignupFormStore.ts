import { singleton } from "tsyringe";

import { Action, Store } from "usestore-ts";

import { apiService } from "../services/ApiService";
import { Gender } from "../types";
import { nullGender } from "../nullObject";

@singleton()
@Store()
class SignupFormStore {
  email = '';
  name = '';
  password = '';
  passwordConfirmation = '';
  gender: Gender = nullGender
  height = "";
  weight = "";
  description = '';
  accessToken = '';

  error = false;

  isEmailDuplicated = false;
  isEmailValid = false;

  isNameDuplicated = false;
  isNameValid = false;

  isPasswordValid = false;
  isPasswordConfirmationValid = false;

  @Action()
  changeEmail(email: string) {
    this.email = email;
  }

  @Action()
  changeName(name: string) {
    this.name = name;
  }

  @Action()
  changePassword(password: string) {
    this.password = password;
  }

  @Action()
  changePasswordConfirmation(password: string) {
    this.passwordConfirmation = password;
  }

  @Action()
  changeGender(gender: Gender) {
    this.gender = gender;
  }

  @Action()
  changeHeight(height: string) {
    this.height = height;
  }

  @Action()
  changeWeight(weight: string) {
    this.weight = weight;
  }

  @Action()
  changeDescription(description: string) {
    this.description = description;
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
    this.email = '';
    this.name = '';
    this.password = '';
    this.passwordConfirmation = '';
    this.gender = nullGender;
    this.height = '';
    this.weight = '';
    this.description = '';
    this.error = false;
    this.accessToken = '';
    this.isNameDuplicated = false;
  }

  get valid() {
    return this.emailValidation(this.email)
      && this.passwordValidation(this.password)
      && !!this.name
      && this.password === this.passwordConfirmation
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

    if(this.isEmailValid) {
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
    this.isPasswordConfirmationValid = this.password === passwordConfirmation;
  }

  async signup() {
    try {
      const accessToken = await apiService.signup({
        email: this.email,
        name: this.name,
        password: this.password,
        gender: this.gender?._id || '',
        height: this.height,
        weight: this.weight,
        description: this.description,
      });

      this.setAccessToken(accessToken);
    } catch (error) {
      this.setError();
    }
  }
}

export default SignupFormStore;
