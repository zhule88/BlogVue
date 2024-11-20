import anyObject from "@/types/common/anyObject"
export default class color{
  letters = '0123456789ABCDEF';
  key = []
  random(key:string){
    let css:anyObject = {}
   let color = '#';
    for (let i = 0; i < 6; i++) {
        color += this.letters[Math.floor(Math.random() * 16)];
    }
    css[key] = color;
    return css;
  }

}
