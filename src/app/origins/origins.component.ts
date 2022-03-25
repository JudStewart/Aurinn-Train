import { Component, OnInit } from '@angular/core';
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
    
    selectedValue: string = '';
    
    gold = 0;
    heirloom = 0;
    reputation = 0;
    power = 0;

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