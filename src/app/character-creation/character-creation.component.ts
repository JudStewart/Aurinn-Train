import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as Gen from 'aurinn-train-content-generator';
import {races, classes} from 'aurinn-train-content-generator/dist/interfaces/interfaces'

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.scss']
})
export class CharacterCreationComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  
  die = "\uD83C\uDFB2";
  origin: any;
  name = ''
  race = ''
  
  gen = Gen
  races = races
    
  ngOnInit(): void {
    this.origin = JSON.parse(this.route.snapshot.paramMap.get('origin')!)
  }
}