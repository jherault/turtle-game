import {Component, OnInit, Input} from '@angular/core';
import {Coordinates} from "../coordinates";

@Component({
  selector: '[case]',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {

  @Input()
  public coordinates:Coordinates;

  @Input()
  public isBelongToTheCourse:boolean;

  constructor() { }

  ngOnInit() {
  }

}
