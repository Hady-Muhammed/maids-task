import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any = {
    data: [],
    page: 1,
    totalPages: 0,
    totalUsers: 0,
    perPage: 0,
    cachedUsers: {},
  };
  searchId!: string;
  displayedColumns: string[] = ['no', 'avatar', 'name', 'email'];

  constructor(
    private userService: UserService,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.spinnerService.show();
    this.userService
      .getUsers({
        page: this.users.page,
      })
      .then(({ data, total, total_pages, per_page }: any) => {
        this.spinnerService.hide();
        this.users.data = data;
        this.users.totalPages = total_pages;
        this.users.totalUsers = total;
        this.users.perPage = per_page;
        this.users.cachedUsers[this.users.page] = { ...this.users };
      });
  }

  onPageChange($event: PageEvent) {
    this.users.page = $event.pageIndex + 1;
    this.triggerPaginationLogic();
  }

  triggerPaginationLogic() {
    if (this.isCurrentUsersPageAlreadyInCache()) {
      this.users = this.users.cachedUsers[this.users.page];
    } else {
      this.getUsers();
    }
  }

  isCurrentUsersPageAlreadyInCache() {
    return this.users.cachedUsers[this.users.page];
  }

  openUserDetails(id: string) {
    this.router.navigateByUrl(`/users/${id}`);
  }

  searchUsers() {
    console.log(2);
    if (this.searchId) {
      console.log(1);

      setTimeout(() => {
        this.userService
          .getUserDetails(this.searchId)
          .toPromise()
          .then(({ data }: any) => {
            this.users.data = [data];
          })
          .catch(() => (this.users.data = []));
      }, 2000);
    } else {
      this.getUsers();
    }
  }
}
