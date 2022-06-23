import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as Gen from 'aurinn-train-content-generator';
import {
  races,
  classes,
  IGender,
} from 'aurinn-train-content-generator/dist/interfaces/interfaces';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.scss'],
})
export class CharacterCreationComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  die = '\uD83C\uDFB2';
  origin: any;
  name = '';
  race = '';
  genderCustom = '';
  genderChoice = '';

  gen = Gen;
  races = races;
  genders = ['Female', 'Male', 'Other'];

  ngOnInit(): void {
    this.origin = JSON.parse(this.route.snapshot.paramMap.get('origin')!);
  }

  randomName() {
    let genderVal = undefined;

    switch (this.genderChoice) {
      case 'Male':
      case 'Female':
        genderVal = this.genderChoice.toLocaleLowerCase() as IGender;
        break;
      case 'Other':
      case '':
      default:
        break;
    }

    this.name = Gen.Names.generate({
      race: this.race != '' ? this.race : undefined,
      gender: genderVal,
    })['name'];
  }
}
