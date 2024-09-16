import {Component} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive, Router} from "@angular/router";
import {AuthenticationService} from "../../auth/domain/services/authentication.service";
import {NgIf} from "@angular/common";

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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn!: Boolean;
  showFiller = false;
  isMenuOpen: boolean = false;
  role!: string | null;

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.loggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    })
    this.role = localStorage.getItem("role");

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
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
