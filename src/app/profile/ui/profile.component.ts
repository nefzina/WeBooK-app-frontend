import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../domain/services/profile.service";
import {IUser} from "../domain/interface/IUser";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {UploadService} from "../../services/upload.service";
import {UserIdService} from "../../services/userId.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  id: number = 0;
  user!: IUser;
  defaultProfilePic: String = '../../../assets/profile.png';

  constructor(private profileService: ProfileService,
              private uploadService: UploadService, private userIdService: UserIdService) {
  }

  ngOnInit() {
    this.userIdService.getUserId.subscribe(id => {
      this.id = id;
      console.log("profilePge", id)
    });
    if (!!this.id) {
      this.profileService.getUserById(this.id).subscribe((response) => {
        this.user = response;
      })
    }
  }

  uploadFile(event: Event) {
    this.uploadService.uploadFile(event).subscribe(
      {
        next: (res) => {
          this.user.profilePicture = res;
          this.profileService.updateUser(this.id, this.user).subscribe((res) => {
            this.user = res;
          });
        },
        error: (err) => console.error('Upload error', err),
      }
    )
  }

  getImageUrl(filename: string): string {
    return `${environment.API_URL}/uploads/${filename}`;
  }
}
