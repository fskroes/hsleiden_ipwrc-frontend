
export class EmployeeModel {
  constructor(
    public id?: number,
    public email?: string,
    public password?: string,
    public _name?: string,
    public _role?: string
  ) { }


  public geName(): string {
    return this._name;
  }

  public getRole(): string {
    return this._role;
  }
}
