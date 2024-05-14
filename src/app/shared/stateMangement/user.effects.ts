import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUsers } from './user.actions';
import { UserService } from '../service/user.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
    page:number;
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUsers(this.page).pipe(
          map(users => ({ type: '[User] Load Users Success', payload: users })),
          catchError(error => of({ type: '[User] Load Users Failure', payload: error }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}