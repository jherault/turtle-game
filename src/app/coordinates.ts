/**
 * Created by J_HERAULT on 14/02/2017.
 */

/**
 * CLasse de coordonnees, avec un temoin supplementaire permettant de savoir, dans le cas des cases, s'il y a une bordure a gauche
 */
export class Coordinates {
  private _x: number;
  private _y: number;
  public l: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.l = false;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  equals(p: Coordinates): boolean {
    return this.x == p.x && this.y == p.x;
  }
}
