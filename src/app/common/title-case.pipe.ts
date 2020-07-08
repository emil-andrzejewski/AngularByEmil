import {Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {
    ofPositions: number[];
    thePositions: number[];
    spacePosiostions: number[];
    countWords: number;


    transform(tekst: string, args?: any) {
        if(!tekst) return null;
        this.ofPositions=this.findText(tekst,'of');
        this.thePositions=this.findText(tekst,'the');
        this.spacePosiostions=this.findText(tekst,' ');
        return this.textToReturn(tekst);
    }

    textToReturn(tekst: string){
        let ret:string;
        let ofPos: number=0;
        let thePos: number=0;
        let spacePos: number=0;
        ret=tekst.substr(0,1).toUpperCase();
        for (let i=1;i<tekst.length;i++) {
            if(this.ofPositions[ofPos]==i) {
                ofPos++;
                ret+='of';
                i+='of'.length-1;
            }
            else if(this.thePositions[thePos]==i) {
                thePos++;
                ret+='the';
                i+='the'.length-1;
            }
            else if(this.spacePosiostions[spacePos]==i) {
                spacePos++; 
                ret+=' ';
                i++;
                ret+=tekst.substr(i,1).toUpperCase();
            }
            else {
                ret+=tekst.substr(i,1).toLowerCase();
            }
        }
        return ret; 
    }

    findText(tekst: string,szukany: string) {
        let kursor=0;
        //let count=0;
        let len=tekst.length;
        let ar = new Array();
        while (kursor>=0) {
            kursor=tekst.substring(kursor,len).toLowerCase().search(szukany);
            if(kursor>=0) {
                if(ar.length>0) kursor=ar[ar.length-1] + kursor+ szukany.length;
                ar.push(kursor);
                //console.log(`Kursor:${kursor} Count:${count} długość szukanego: ${szukany.length}`);
                kursor+=szukany.length;
                //count++;
            }
            else return ar;  
        } 
        return ar; 
    }
}   