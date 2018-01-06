import {Component, OnInit, Input, OnChanges, SimpleChange} from '@angular/core';
import {Coordinates} from "../coordinates";
import { Turtle } from 'app/turtle';

@Component({
  selector: '[appGridComponent]',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public cases:Array<Coordinates>;

  @Input()
  public turtle:Turtle; 

  @Input()
  public parcours:Array<Coordinates>;


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
    this.init();
  }

  init(): void {
    this.cases = [];
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

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {

    if (changes['parcours'] && this.parcours) {

        this.init();
    }
}
}
