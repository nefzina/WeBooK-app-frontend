import {Component, OnInit} from '@angular/core';
import {IUser} from "../../domain/interface/IUser";
import {ProfileService} from "../../domain/services/profile.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ICategory} from "../../domain/interface/ICategory";
import {CommonModule} from "@angular/common";
import {MatChipsModule} from '@angular/material/chips';
import {type} from "node:os";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserIdService} from "../../../services/userId.service";
import {Book} from "../../../book/domain/models/book";
import {tap} from "rxjs";
import {ApiService} from "../../../services/api.service";
import {IPasswords} from "../../domain/interface/IPasswords";
import {log} from "node:util";

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit {
  user!: IUser;
  id: number = 0;
  categories!: ICategory[];
  category!: ICategory;
  defaultProfilePic: String = '../../../assets/profile.png'
  hide = true;
  userForm: FormGroup;
  selectedCategories: ICategory[] = [];
  regex = {
    username: "^[a-zA-Z_.]{2,20}$",
    password: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*-])(?=\\S+$).{8,20}$",
    city: "^[a-zA-Z-]{2,20}$",
    zip_code: "^\\d{5}$"
  }

  constructor(private profileService: ProfileService, private fb: FormBuilder, private userIdService: UserIdService) {
    this.userForm = this.fb.group({
      username: ['', Validators.pattern(this.regex.username)],
      city: ['', Validators.pattern(this.regex.city)],
      zip_code: ['', Validators.pattern(this.regex.zip_code)],
      categories: [null],
      oldPassword: ['', Validators.pattern(this.regex.password)],
      newPassword: ['', Validators.pattern(this.regex.password)],
      confirmPassword: ['', Validators.pattern(this.regex.password)],
    }, {validators: this.passwordValidator});
  }

  ngOnInit() {
    this.userIdService.getUserId.subscribe(id => {
      this.id = id;
    });

    if (!!this.id) {
      this.profileService.getUserById(this.id).subscribe((response) => {
        this.user = response;
      })
    }

    this.profileService.getCategories().subscribe(response => this.categories = response);
  }

  isCategorySelected(category: ICategory): boolean {
    return this.user?.preferences.some(preference => preference.id === category.id) ?? false;
  }

  passwordValidator(fg: FormGroup) {
    const oldPassword = fg.get('oldPassword');
    const newPassword = fg.get('newPassword');
    const confirmPassword = fg.get('confirmPassword');

    if (newPassword?.value === oldPassword?.value && oldPassword?.touched && newPassword?.touched) {
      return {sameAsOldPassword: true};
    }

    if (newPassword?.value !== confirmPassword?.value && confirmPassword?.touched && newPassword?.touched) {
      return {passwordsMismatch: true};
    }

    return null;
  }

  onCategoryChange(category: ICategory, isSelected: boolean) {
    if (isSelected) {
      this.selectedCategories.push(category);
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
  }

  updateUser() {
    this.userForm.patchValue({
      categories: this.selectedCategories
    });

    if (this.userForm.valid) {
      if (this.userForm.get("username")?.value) this.user.username = this.userForm.get("username")?.value;
      if (this.userForm.get("city")?.value) this.user.city = this.userForm.get("city")?.value;
      if (this.userForm.get("zip_code")?.value) this.user.zip_code = this.userForm.get("zip_code")?.value;
      if (this.userForm.get("categories")?.value) this.user.preferences = this.userForm.get("categories")?.value;

      this.profileService.updateUser(this.id, this.user).subscribe({
        next: (res) => {
          return res
        },
        error: (err) => console.error(err)
      });
    }

    // patch password
    if (this.userForm.valid && this.userForm.get("oldPassword")?.value && this.userForm.get("newPassword")?.value && this.userForm.get("confirmPassword")?.value) {
      const passwords: IPasswords = {
        oldPassword: this.userForm.get("oldPassword")?.value,
        newPassword: this.userForm.get("newPassword")?.value,
      }
      this.profileService.patchPassword(this.id, passwords).subscribe({
        next: (res) => {
          return res
        },
        error: (err) => console.error(err)
      });
    }
  }
}
