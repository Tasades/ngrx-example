import {Injectable} from "@angular/core";
import {BehaviorSubject, delay, Observable, of} from "rxjs";

export interface UserModelInBackend {
  id: string;
  firstName: string;
  lastName?: string;
}

@Injectable({providedIn: 'root'})
export class UserService {

  fakeBackendData = new BehaviorSubject<UserModelInBackend[]>([{
    id: 'id-1',
    firstName: 'Max',
    lastName: 'Mustermann'
  }, {
    id: 'id-2',
    firstName: 'Jon',
    lastName: 'Doe'
  }, {
    id: 'id-3',
    firstName: 'Alice',
    lastName: 'Star'
  }, {
    id: 'id-4',
    firstName: 'Bob'
  }, {
    id: 'id-5',
    firstName: 'Steve'
  }, {
    id: 'id-6',
    firstName: 'Nobody'
  }]);

  userSequence = 6;


  getUser$(): Observable<UserModelInBackend[]> {
    return this.fakeBackendData.pipe(delay(3000));
  }

  createUser(data: Omit<UserModelInBackend, 'id'>): Observable<UserModelInBackend> {
    const currentUsers = this.fakeBackendData.getValue();
    const userToCreate: UserModelInBackend = {
      id: 'id-' + (++this.userSequence),
      ...data
    };
    this.fakeBackendData.next([...currentUsers, userToCreate]);
    return of(userToCreate).pipe(delay(2000));
  }

  updateUser(id: string, data: Omit<UserModelInBackend, 'id'>): Observable<UserModelInBackend> {
    let user = this.fakeBackendData.getValue().find(u => u.id === id);
    if (user) {
      user = {
        ...user,
        ...data
      };
      let currentUsers = this.fakeBackendData.getValue();
      currentUsers = [...currentUsers.filter(u => u.id !== id), {
        ...user,
        ...data
      }]
      currentUsers.sort((u1, u2) => u1.id.localeCompare(u2.id));
      this.fakeBackendData.next(currentUsers);
      return of(user).pipe(delay(6000));
    }
    throw Error('no user found with id: ' + id)
  }

  deleteUser(id: string): void {
    this.fakeBackendData.next(this.fakeBackendData.getValue().filter(u => u.id !== id));
  }
}
