import {Component, OnInit, Input} from '@angular/core';
import {Coordinates} from "../coordinates";

@Component({
  selector: '[appGridComponent]',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  private cases:Array<Coordinates>;

  @Input()
  public parcours:Array<Coordinates>;

  @Input()
  public turtlePos:Coordinates;

  @Input()
  public size:number;

  constructor() { }

  belongToTheCourse(p:Coordinates):boolean {
    return this.getCorrespondingCourseCoordinates(p) != null;
  }

  private getCorrespondingCourseCoordinates(p: Coordinates): Coordinates {
    let filter:Array<Coordinates> = this.parcours.filter((pos: Coordinates) => pos.x == p.x && pos.y == p.y);
    return filter.length == 1 ? filter[0] : null;
  }

  ngOnInit() {
    this.cases = [];
    console.dir(this.parcours);
    for (let y: number = this.size-1; y >= 0; y--) {
      for (let x: number = 0; x < this.size; x++) {
        let coordinates = new Coordinates(x, y);
        let correspondingCourseCoordinates:Coordinates = this.getCorrespondingCourseCoordinates(coordinates);
        if (correspondingCourseCoordinates != null) {
          coordinates.l = correspondingCourseCoordinates.l;
        }
        this.cases.push(coordinates);
      }
    }
  }
}
