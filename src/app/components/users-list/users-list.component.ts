import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


import { Router } from '@angular/router';
import { UserService } from '../../shared/service/user.service';
import { Store } from '@ngrx/store';
import { selectUsers, selectLoading } from 'src/app/shared/stateMangement/user.selectors';
import { loadUsers } from 'src/app/shared/stateMangement/user.actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  isLoading = true;
  usersList: any[];
  selectedUser: any;
  dataSource: any;
  displayedColumns: string[] = ['avatar', 'id', 'first_name', 'last_name', 'email'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users$ = this.store.select(selectUsers);
  loading$ = this.store.select(selectLoading);

  constructor(private userService: UserService, private router: Router, private store: Store) { }


  ngOnInit() {
    this.getUsers(1);
    this.store.dispatch(loadUsers());

  }

  getUsers(page: number) {
    this.userService.getUsers(page)
      .subscribe(response => {
        this.usersList = response.data;
        console.log(response);
        this.dataSource = new MatTableDataSource(this.usersList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          return data.id.toString().includes(filter);
        };
        this.isLoading = false;
      });
  }

  gotoDetails(row: any) {
    this.router.navigate(['userData', row.id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}