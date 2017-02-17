import {Coordinates} from "./coordinates";
export class Turtle {

  private _position:Coordinates;
  private _direction:Coordinates;


  step():void {
    this.position.x += this.direction.x;
    this.position.y += this.direction.y;
  }

  turnTop():void {
    this.direction.x = 0;
    this.direction.y = 1;
  }

  turnRight():void {
    this.direction.x = 1;
    this.direction.y = 0;
  }

  turnBottom():void {
    this.direction.x = 0;
    this.direction.y = -1;
  }


















  get position(): Coordinates {
    return this._position;
  }

  set position(value: Coordinates) {
    this._position = value;
  }

  get direction(): Coordinates {
    return this._direction;
  }

  set direction(value: Coordinates) {
    this._direction = value;
  }
}
