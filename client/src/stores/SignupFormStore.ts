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
  isNameDuplicated = false;
  error = false;

  get valid() {
    return this.isEmail(this.email)
      && this.isPasswordValid(this.password)
      && !!this.name
      && this.password === this.passwordConfirmation
  }

  private isEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private isPasswordValid = (password: string) => {
    return password.length >= 8 && password.length <= 16;
  }

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
  changeIsNameDuplicated(isNameDuplicated: boolean) {
    this.isNameDuplicated = isNameDuplicated
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

  async checkUsername(name: string) {
    try {
      const isDuplicated = await apiService.checkUsername({name})
      this.changeIsNameDuplicated(!!isDuplicated)

    } catch(error) {
      this.setError();
    }
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
