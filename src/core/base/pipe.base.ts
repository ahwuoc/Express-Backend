import Injectable from "../decorators/InjecTable.decorator";

@Injectable()
export class AppPipes {
  transform(value: any, type: any): any | Promise<any> {}
}
