import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

interface OriginType {
    value: string;
    viewValue: string;
}

export class OriginTypeErrorStateMatcher implements ErrorStateMatcher
{
    isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
    }
}

@Component({
    selector: 'app-origins',
    templateUrl: './origins.component.html',
    styleUrls: ['./origins.component.scss']
})
export class OriginsComponent implements OnInit {
    
    @Output() event = new EventEmitter();
    
    selectedValue: string = '';
    
    gold = 0;
    heirloom = 0;
    reputation = 0;
    power = 0;
    
    die = "\uD83C\uDFB2";

    constructor() { }

    ngOnInit(): void {
    }
    
    originTypes: OriginType[] = [
        {value: "prime", viewValue: "The Prime"},
        {value: "vagrant", viewValue: "The Astral Vagrant"},
        {value: "novaborne", viewValue: "The Novaborne"},
    ];
    
    matcher = new OriginTypeErrorStateMatcher();
    selected = new FormControl('valid', [Validators.required, Validators.pattern('[a-z]+')])
    
    used()
    {
        return this.gold + this.heirloom + this.reputation + this.power
    }
    
    reset()
    {
        this.gold = 0;
        this.heirloom = 0;
        this.reputation = 0;
        this.power = 0;
    }
    
    randomizeOriginType()
    {
        var n = this.randomInt(0, 2)
        this.selectedValue = this.originTypes[n].value
        this.reset();
    }
    
    randomizeBoon()
    {
        if (this.used() >= 3) return;
        else if (this.selectedValue == "prime")
        {
            switch (this.randomInt(0, 2))
            {
                case 0:
                    this.gold++;
                    break;
                case 1:
                    this.heirloom++;
                    break;
                case 2:
                    this.reputation++;
                    break;
            }
        }
        else if (this.selectedValue == "novaborne")
        {
            switch (this.randomInt(0, 2))
            {
                case 0:
                    this.gold++;
                    break;
                case 1:
                    this.heirloom++;
                    break;
                case 2:
                    this.power++;
                    break;
            }
        }
        else 
        { 
            switch (this.randomInt(0, 3))
            {
                case 0:
                    this.gold++;
                    break;
                case 1:
                    this.heirloom++;
                    break;
                case 2:
                    this.reputation++;
                    break;
                case 3:
                    this.power++;
                    break;
            }
        }
    }
    
    randomInt(min: number, max: number)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    buildOrigin()
    {
        return JSON.stringify({
            "origin":this.selectedValue,
            "gold":this.gold,
            "heirloom":this.heirloom,
            "reputation":this.reputation,
            "power":this.power
        })
    }
}

/*

psuedo code

used = 0 (at first)

when + is clicked():
    increment used
    if used is now 3, disable + buttons

when - is clicked():
    decrement used
    if used is now 0, disable - buttons
*/