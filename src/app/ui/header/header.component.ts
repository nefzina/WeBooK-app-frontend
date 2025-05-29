import {Component, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive, Router} from "@angular/router";
import {AuthenticationService} from "../../auth/domain/services/authentication.service";
import {NgIf} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';
import {ProfileService} from "../../profile/domain/services/profile.service";
import {UserIdService} from "../../domain/services/userId.service";
import {IUser} from "../../profile/domain/interface/IUser";
import {ApiService} from "../../domain/services/api.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    RouterLinkActive,
    RouterLink,
    NgIf,
    MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  id: number = 0;
  isLoggedIn!: Boolean;
  showFiller = false;
  isMenuOpen: boolean = false;
  role!: string | null;
  user!: IUser;
  defaultProfilePic: String = 'assets/profile.png';

  constructor(private router: Router, private authService: AuthenticationService,
              private profileService: ProfileService, private userIdService: UserIdService,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.userIdService.getUserId.subscribe(id => {
      this.id = id;

      if (!!id) {
        this.role = localStorage.getItem("role");
        this.profileService.getUserById(this.id).subscribe((response) => {
          this.user = response;
        })
      } else {
        this.authService.setLoggedIn(false);
      }
    });
    this.authService.loggedIn$.subscribe(status => {
        this.isLoggedIn = status;
      }
    );
  };

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getImageSrc(filename: string): string {
    return this.apiService.getImageUrl(filename);
  }

  onLogoff() {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }

}

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x) {
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
}
