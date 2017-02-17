import {Component, OnInit, HostListener} from "@angular/core";
import {Coordinates} from "./coordinates";
import {Turtle} from "./turtle";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /**
   * taille de la grille (fixee a 5, si modifiee il faut impacter le css en consequence... TODO)
   */
  private size: number;

  /**
   * La tortue
   */
  private turtle: Turtle;

  /**
   * Le parcours
   */
  private parcours: Array<Coordinates>;

  ngOnInit() {
    this.size = 5;
    this.initParcours();
    this.turtle = new Turtle();
    this.turtle.position = new Coordinates(this.parcours[0].x, this.parcours[0].y);
    this.turtle.direction = new Coordinates(this.parcours[1].x - this.parcours[0].x, this.parcours[1].y - this.parcours[0].y);
    console.dir(this.parcours);
    console.dir(this.turtle.position);
  }

  /**
   * Methode permettant de generer un parcours
   */
  private initParcours(): void {
    this.parcours = [];
    //point initial
    let ybegin: number = Math.floor(Math.random() * this.size);
    let xbegin: number = 0;

    this.parcours.push(new Coordinates(xbegin, ybegin));


    let possibleDirections: Array<Coordinates> = [{x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}]
      .map((json: any) => new Coordinates(json.x, json.y));

    let index: number = Math.floor(Math.random() * possibleDirections.length);
    while (!this.lastCoordinatesReached()) {
      if (this.isDirectionPossible(possibleDirections, index)) {
        let lastPosition: Coordinates = this.parcours[this.parcours.length - 1];
        let direction = possibleDirections[index];
        this.parcours.push(new Coordinates(lastPosition.x + direction.x, lastPosition.y + direction.y))
      }
      index = Math.floor(Math.random() * possibleDirections.length);
    }
    this.borderize();
  }

  /**
   * methode permettant d'inserer les bordures
   */
  private borderize(): void {
    for (let i: number = 0; i < this.parcours.length; i++) {
      let current: Coordinates = this.parcours[i];
      this.applyBorder(current, i);
    }
  }

  /**
   * on applique des bordures a gauche si la coordonnee juxtapose la case de gauche et que celle-ci ne la precede pas dans le parcours
   * @param current la case du parcours courante
   * @param index l'index de la case dans le parcours
   */
  private applyBorder(current:Coordinates, index:number): void {

    if (index != 0) {
      if (!(this.parcours[index -1].x == current.x - 1 && this.parcours[index - 1].y == current.y))
        if (this.coordinatesPresentInCourse(new Coordinates(current.x-1, current.y)))
          current.l = true;
    }

  }

  /**
   * Methode permettant de verifier que le cote droit de la grille est atteint
   * @returns {boolean}
   */
  private lastCoordinatesReached(): boolean {
    return this.parcours[this.parcours.length - 1].x == this.size - 1;
  }

  /**
   * On teste si la case selectionnee aleatoirement est une case possible pour la suite du parcours
   * @param possibleDirections
   * @param index
   * @returns {boolean}
   */
  private isDirectionPossible(possibleDirections: Array<Coordinates>, index: number): boolean {
    let lastPosition: Coordinates = this.parcours[this.parcours.length - 1];
    let possibleDirection = possibleDirections[index];
    let possibleCoordinates: Coordinates = new Coordinates(lastPosition.x + possibleDirection.x, lastPosition.y + possibleDirection.y);
    // la coordonnee en x ne doit pas deborder de la grille et y doit se trouver entre 0 et size
    return ( possibleCoordinates.x < this.size && possibleCoordinates.x >= 0 && possibleCoordinates.y < this.size && possibleCoordinates.y >= 0) && !this.coordinatesPresentInCourse(possibleCoordinates);
  }

  /**
   * Methode permettant de verifier que des coordonnees appartiennent ou non au parcours
   * @param possibleCoordinates
   * @returns {boolean}
   */
  private coordinatesPresentInCourse(possibleCoordinates: Coordinates): boolean {
    return this.parcours.filter((c: Coordinates) => c.x == possibleCoordinates.x && c.y == possibleCoordinates.y).length != 0;
  }

  @HostListener('document:keyup', ['$event'])
  keyUp(event:KeyboardEvent) {

    switch(event.key) {
      case 'ArrowUp':
        this.turtle.turnTop();this.turtle.step();
        break;
      case 'ArrowDown':
        this.turtle.turnBottom();this.turtle.step();
        break;
      case 'ArrowRight':
        this.turtle.turnRight();this.turtle.step();
        break;
      default:break;
    }
  }
}
