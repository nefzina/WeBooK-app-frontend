import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {ProfileService} from "../../domain/services/profile.service";
import {ApiService} from "../../../services/api.service";
import {UserIdService} from "../../../services/userId.service";
import {IUser} from "../../domain/interface/IUser";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-admin-back-office',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './admin-back-office.component.html',
  styleUrl: './admin-back-office.component.scss'
})
export class AdminBackOfficeComponent implements OnInit, AfterViewInit {
  constructor(private profileService: ProfileService, private userIdService: UserIdService) {
  }

  id: number = 0;
  user!: IUser;
  users!: IUser[];
  dataSource = new MatTableDataSource<IUser>([]);
  defaultProfilePic: String = '../../../../assets/profile.png';

  ngOnInit() {
    this.userIdService.getUserId.subscribe(id => {
      this.id = id;
    });
    if (!!this.id) {
      this.profileService.getUserById(this.id).subscribe((response) => {
        this.user = response;
        if (this.user?.role.type === "admin") {
          this.profileService.getAllUsers().subscribe((response) => {
            this.users = response;
            this.dataSource.data = response;
          })
        }
      })
    }
  }

  displayedColumns: string[] = ['profilePicture', 'email', 'role', 'username'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getImageUrl(filename: string): string {
    return `${environment.API_URL}/uploads/${filename}`;
  }
}
