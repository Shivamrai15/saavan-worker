interface Obj {
    [key: string]: any;
}
  
export interface UC<T extends Obj | string = any, TRes = any> {
    execute: (params: T) => Promise<TRes>;
}