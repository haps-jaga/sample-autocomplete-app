import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

const VALIDATION_ERROR_MESSAGE = "validationMessages";
const CHARACTER_LIMIT_ERROR_TYPE = ["minlength", "maxlength"];
const PATTERN_ERROR_TYPE = ["pattern", "email"];

@Injectable({
  providedIn: "root",
})
export class ValidationService {
  constructor(private translateService: TranslateService) {}

  isFieldInvalid(field) {
    return field && field.touched && field.invalid;
  }

  errorMessage(control, label?, translateParams?) {
    let errorMessage = null;
    let requiredCharacterLength = null;
    let value = "Field";
    const errorType = Object.keys(control.errors)[0];
    const key = VALIDATION_ERROR_MESSAGE + "." + errorType;

    if (CHARACTER_LIMIT_ERROR_TYPE.includes(errorType)) {
      requiredCharacterLength = control.errors[errorType].requiredLength;
    }

    if (label) {
      value = label;
    }

    const languageParams = {
      value,
      min: requiredCharacterLength,
      max: requiredCharacterLength,
    };

    if (translateParams) {
      translateParams = JSON.parse(translateParams);
      Object.keys(translateParams).forEach((keyValue, index) => {
        languageParams[keyValue] = translateParams[keyValue];
      });
    }

    this.translateService.get(key, languageParams).subscribe((response) => {
      errorMessage = response;
    });

    return errorMessage;
  }
}
