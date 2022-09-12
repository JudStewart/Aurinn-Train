import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as Gen from 'aurinn-train-content-generator';
import {
  races,
  classes,
  backgrounds,
  IGender,
  IClass,
  IBackgroundData
} from 'aurinn-train-content-generator/dist/interfaces/interfaces';

const BACKGROUND_TEMPLATE = {
  description: '',
  'skill proficiencies': [],
  'tool proficiencies': [],
  languages: [],
  equipment: [],
  'additional rolls': {},
  feature: {
    name: '',
    description: ''
  },
  characteristics: '',
  'personality traits': [],
  ideals: {},
  bonds: [],
  flaws: []
}

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
  class = '';
  classCustom = '';
  background = '';
  backgroundData: IBackgroundData = BACKGROUND_TEMPLATE
  
  gen = Gen;
  races = races;
  classes = classes.concat(['Other']);
  genders = ['Female', 'Male', 'Other'];
  backgrounds = backgrounds.concat(['Custom'])

  ngOnInit(): void {
    this.origin = JSON.parse(this.route.snapshot.paramMap.get('origin')!);
  }
  
  randomName() {
    let genderVal = this.evaluateGenderForNameGen()

    this.name = Gen.Names.generate({
      race: this.race != '' ? this.race : undefined,
      gender: genderVal,
    })['name'];
  }
  
  benName() {
    let genderVal = this.evaluateGenderForNameGen()
    let classVal = undefined
    
    if (this.class != '' && this.class != 'Other') 
      classVal = this.class.toLocaleLowerCase() as IClass
    
    this.name = Gen.Utils.formatString(Gen.Ben.generate({
      race: this.race != '' ? this.race : undefined,
      gender: genderVal,
      cls: classVal
    })['name'])
      
  }
  
  evaluateGenderForNameGen() {
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
    return genderVal
  }
  
  randomGender() {
    this.genderChoice = Gen.Utils.pick(this.genders)
  }
  
  randomRace() {
    this.race = Gen.Utils.pick(this.races)
  }
  
  randomClass() {
    this.class = Gen.Utils.pick(this.classes)
  }
  
  randomBackground() {
    this.background = Gen.Utils.pick(this.backgrounds)
  }
}