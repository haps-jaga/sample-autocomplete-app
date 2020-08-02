import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { ValidationService } from "src/app/services/validation.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EmployeeService } from "src/app/services/employee.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.less"],
})
export class AddComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) {}

  public showError(fieldName: string) {
    const control = this.formGroup.get(fieldName);
    return this.validationService.isFieldInvalid(control);
  }

  public errorMsg(fieldName, translateParams = null) {
    const control = this.formGroup.get(fieldName);
    return this.validationService.errorMessage(
      control,
      fieldName,
      translateParams
    );
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  public addEmployee() {
    const data = this.formGroup.value;
    this.employeeService.addEmployee(data).subscribe(
      (response) => {
        this.openSnackBar("Added Employee", "Close");
        this.formGroup.reset();
      },
      (error) => {
        const serverError = error.error;
        if (serverError && serverError.message) {
          this.openSnackBar(serverError.message, "Close");
        } else {
          this.openSnackBar("Unable to add Employee", "Close");
        }
      }
    );
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(60),
          Validators.pattern(/^((?!\s{2,}).)*$/),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
    });
  }
}
