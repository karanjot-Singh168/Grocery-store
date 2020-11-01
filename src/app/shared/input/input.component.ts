import { Component, OnInit,Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
@Input() control:FormControl;
@Input() label:string;
@Input() inputType:string;
@Input() min:number;
  constructor() { }

  ngOnInit(): void {
  }

}
