import {Coordinates} from "./coordinates";

export class Turtle {

  private _position: Coordinates;
  private _direction: Coordinates;

  step(): void {
    this.position.x += this.direction.x;
    this.position.y += this.direction.y;
  }

  /**
   * Turn until top orientation
   */
  turnTop(): void {
    let toLeft: boolean = this.countLeftRotationTo(new Coordinates(0, 1), this.direction.copy()) < this.countRightRotationTo(new Coordinates(0, 1), this.direction.copy())
    while (!(this.direction.x == 0 && this.direction.y == 1)) {
      if (toLeft) {
        this.rotateLeft();
      } else {
        this.rotateRight();
      }
    }
  }

  turnRight(): void {
    let toLeft: boolean = this.countLeftRotationTo(new Coordinates(1, 0), this.direction.copy()) < this.countRightRotationTo(new Coordinates(1, 0), this.direction.copy())
    while (!(this.direction.x == 1 && this.direction.y == 0)) {
      if (toLeft) {
        this.rotateLeft();
      } else {
        this.rotateRight();
      }
    }
  }

  turnLeft(): void {
    let toLeft: boolean = this.countLeftRotationTo(new Coordinates(-1, 0), this.direction.copy()) < this.countRightRotationTo(new Coordinates(-1, 0), this.direction.copy())
    while (!(this.direction.x == -1 && this.direction.y == 0)) {
      if (toLeft) {
        this.rotateLeft();
      } else {
        this.rotateRight();
      }
    }
  }

  turnBottom(): void {
    let toLeft: boolean = this.countLeftRotationTo(new Coordinates(0, -1), this.direction.copy()) < this.countRightRotationTo(new Coordinates(0, -1), this.direction.copy())
    while (!(this.direction.x == 0 && this.direction.y == -1)) {
      if (toLeft) {
        this.rotateLeft();
      } else {
        this.rotateRight();
      }
    }
  }

  rotateRight(): void {
    let x:number = this.direction.x;
    let y:number = this.direction.y;
    this.direction.x = y;
    this.direction.y = -x;
  }

  rotateLeft(): void {
    let x:number = this.direction.x;
    let y:number = this.direction.y;
    this.direction.x = -y;
    this.direction.y = x;
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

  /**
   * compute number of left rotation operation to reach "to" coordinate
   * @param {Coordinates} to the coordinate to reach
   * @param {Coordinates} from the original coordinate
   * @returns {number} the number of rotation operation to perform to reach the new coordinate
   */
  private countLeftRotationTo(to: Coordinates, from: Coordinates): number {
    let count: number = 0;
    while (!(from.x == to.x && from.y == to.y)) {
      let x:number = from.x;
      let y:number = from.y;
      from.x = -y;
      from.y = x;
      count++;
    }
    return count;
  }

  /**
   * compute number of right rotation operation to reach "to" coordinate
   * @param {Coordinates} to the coordinate to reach
   * @param {Coordinates} from the original coordinate
   * @returns {number} the number of rotation operation to perform to reach the new coordinate
   */
  private countRightRotationTo(to: Coordinates, from: Coordinates): number {
    let count: number = 0;
    while (!(from.x == to.x && from.y == to.y)) {
      let x:number = from.x;
      let y:number = from.y;
      from.x = y;
      from.y = -x;
      count++;
    }
    return count;
  }

}
