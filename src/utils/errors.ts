export class DeepValidationError{
  code:number;
  message: string;
  detail: string;
  constructor(code:number, message:string, detail:string){
    this.code = code;
    this.message = message;
    this.detail = detail;
  }
}