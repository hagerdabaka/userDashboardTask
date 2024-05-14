import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  usersList: any[];
  selectedUser: any;
  isLoading = true;
  constructor(private userService: UserService, private router: ActivatedRoute) { }

  ngOnInit() {

    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');
    this.getUserDetails(getParamId);

  }
  getUserDetails(id: any) {
    this.userService.getUserDetails(id)
      .subscribe(response => {
        this.selectedUser = response.data;
        this.isLoading = false;
        console.log(this.selectedUser)
      });
  }
}
