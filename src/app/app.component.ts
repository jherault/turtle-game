import {Component, OnInit, HostListener, ElementRef, ViewChild, Renderer2} from "@angular/core";
import {Coordinates} from "./coordinates";
import {Turtle} from "./turtle";
import {Instruction} from "./instruction";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * taille de la grille (fixee a 5, si modifiee il faut impacter le css en consequence... TODO)
   */
  public size: number;

  /**
   * La tortue
   */
  public turtle: Turtle;

  /**
   * Le parcours
   */
  public parcours: Array<Coordinates>;

  /**
   * instructions donnees a la tortue
   */
  public instructions: Array<Instruction>;


  public etat: number; // 1 partie en cours, 2 partie gagnee, 3 partie perdue

  /**
   * niveau d'utilisation (1 - easy, 2 - medium, 3 - hard, 4 - developer!!!)
   */
  public level: number;

  /**
   * Max level value
   */
  public max: number;

  /**
   * Delai pour le replay des instructions (100-1000)
   */
  private replayDelay: number;

  @ViewChild('turtleDiv') turtleDiv: ElementRef;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.size = 5;
    this.level = 1;
    this.replayDelay = 200;
    this.init();
    this.turnTurtleTopAndStep.bind(this);
    this.turnTurtleBottomAndStep.bind(this);
    this.turnTurtleRightAndStep.bind(this);
    this.renderer.listen('document', 'keyup', (event) => {
      this.keyUp(event);
    });
  }

  init(): void {
    this.etat = 1;
    this.instructions = [];
    this.initParcours();
    this.turtle = new Turtle();
    this.turtle.position = new Coordinates(this.parcours[0].x, this.parcours[0].y);
    this.turtle.direction = new Coordinates(this.parcours[1].x - this.parcours[0].x, this.parcours[1].y - this.parcours[0].y);
    this.computeTurtleViewPosition();
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
   * on applique des bordures a gauche si la coordonnee juxtapose la case de gauche et que celle-ci ne la precede pas dans le parcours
   */
  private borderize(): void {
    for (let i: number = 0; i < this.parcours.length; i++) {
      let current: Coordinates = this.parcours[i];
      if (i != 0) {
        if (!(this.parcours[i - 1].x == current.x - 1 && this.parcours[i - 1].y == current.y))
          if (this.coordinatesPresentInCourse(new Coordinates(current.x - 1, current.y)))
            current.l = true;
      }
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
    return (possibleCoordinates.x < this.size && possibleCoordinates.x >= 0 && possibleCoordinates.y < this.size && possibleCoordinates.y >= 0) && !this.coordinatesPresentInCourse(possibleCoordinates);
  }

  /**
   * Methode permettant de verifier que des coordonnees appartiennent ou non au parcours
   * @param possibleCoordinates
   * @returns {boolean}
   */
  private coordinatesPresentInCourse(possibleCoordinates: Coordinates): boolean {
    return this.parcours.filter((c: Coordinates) => c.x == possibleCoordinates.x && c.y == possibleCoordinates.y).length != 0;
  }

  keyUp(event: KeyboardEvent) {
    if (this.etat == 1) {
      switch (event.key) {
        //LEVEL 1
        case 'ArrowUp':
          if (this.turtle.position.y < this.size - 1) {
            this.turnTurtleTopAndStep();
          }
          break;
        case 'ArrowDown':
          if (this.turtle.position.y > 0) {
            this.turnTurtleBottomAndStep();
          }
          break;
        case 'ArrowRight':
          if (this.turtle.position.x < this.size - 1 && !this.rightCaseHasBorder()) {
            this.turnTurtleRightAndStep();
          }
          break;
        //LEVEL 2
        case 'RotateLeft':
          this.rotateTurtleLeft();
          break;
        case 'RotateRight':
          this.rotateTurtleRight();
          break;
        case 'MoveForward':
          this.moveTurtleForward();
          break;
        default:
          break;
      }

      this.computeTurtleViewPosition();

      if (this.parcours[this.parcours.length - 1].x == this.turtle.position.x && this.parcours[this.parcours.length - 1].y == this.turtle.position.y) {
        this.etat = 2;
      } else if (this.parcours.filter((c) => {
          return c.x == this.turtle.position.x && c.y == this.turtle.position.y
        }).length == 0) {
        this.etat = 3;
      }
    }
  }

  private computeTurtleViewPosition(): void {
    (<HTMLElement>document.querySelector('.turtle')).style.bottom = this.turtle.position.y * 20 +'%';
    (<HTMLElement>document.querySelector('.turtle')).style.left = this.turtle.position.x * 20 +'%';
  }

  moveTurtleForward(log: boolean = true): void {
    if (log) this.instructions.push(new Instruction(this, "MoveForward", this.moveTurtleForward))
    this.turtle.step();
  }

  turnTurtleTopAndStep(log: boolean = true): void {
    if (log) this.instructions.push(new Instruction(this, "Top", this.turnTurtleTopAndStep))
    this.turtle.turnTop();
    this.turtle.step();
  }

  turnTurtleBottomAndStep(log: boolean = true): void {
    if (log) this.instructions.push(new Instruction(this, "Bottom", this.turnTurtleBottomAndStep))
    this.turtle.turnBottom();
    this.turtle.step();
  }

  turnTurtleRightAndStep(log: boolean = true): void {
    if (log) this.instructions.push(new Instruction(this, "Right", this.turnTurtleRightAndStep))
    this.turtle.turnRight();
    this.turtle.step();
  }

  rotateTurtleLeft(log: boolean = true): void {
    if (log) this.instructions.push(new Instruction(this, "rotateLeft", this.rotateTurtleLeft));
    this.turtle.rotateLeft();
  }

  rotateTurtleRight(log: boolean = true): void {
    if (log) this.instructions.push(new Instruction(this, "rotateRight", this.rotateTurtleRight));
    this.turtle.rotateRight();
  }

  rightCaseHasBorder(): boolean {
    return this.parcours.filter(c => c.y == this.turtle.position.y && c.x == this.turtle.position.x + 1 && c.l).length == 1;
  }

  play(): void {
    this.turtle.position = new Coordinates(this.parcours[0].x, this.parcours[0].y);
    setTimeout(this.walk.bind(this, 0), 300);
  }

  private walk(index: number): void {
    if (index < this.instructions.length) {
      this.instructions[index].instruction.call(this, false);
      setTimeout(this.walk.bind(this, index + 1), this.replayDelay);
    }
  }
}
