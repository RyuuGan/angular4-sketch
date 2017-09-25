export class UserShort {
  _id: string;
  avatar: string;
  firstName: string;
  secondName: string;
  lastName: string;
  title: string;
}

export class User extends UserShort {
  email: string;
}
