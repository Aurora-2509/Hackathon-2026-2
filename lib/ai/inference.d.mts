export function createInference(model:unknown):{embed(name:string,category:string):Float32Array;compatibility(a:Float32Array,b:Float32Array):number};
export function rankCandidates(engine:ReturnType<typeof createInference>,anchor:{name:string;category:string},items:Array<Record<string,any>>):Array<Record<string,any>&{compatibility_score:number}>;
