// Exported sklearn TF-IDF -> SVD -> scaler -> ReLU MLP. No training here.
export function createInference(model){
 const dimensions=model.hidden_weights.length/3;
 function embed(name,category){
  const tokens=(String(name)+' '+String(category)).toLowerCase().match(/[\p{L}\p{N}_]+/gu)?.filter(t=>Array.from(t).length>=2)||[];
  const counts=new Map();
  function add(term){const index=model.vocabulary[term];if(typeof index==='number')counts.set(index,(counts.get(index)||0)+1)}
  for(let i=0;i<tokens.length;i++){add(tokens[i]);if(i+1<tokens.length)add(tokens[i]+' '+tokens[i+1])}
  let norm=0;const weights=[];
  for(const [index,count] of counts){const value=(1+Math.log(count))*model.idf[index];weights.push([index,value]);norm+=value*value}
  norm=Math.sqrt(norm);const vector=new Float32Array(dimensions);
  if(!norm)return vector;
  for(let dimension=0;dimension<dimensions;dimension++){let value=0;for(const [index,weight]of weights)value+=(weight/norm)*model.svd[index][dimension];vector[dimension]=value}
  return vector;
 }
 function compatibility(a,b){
  const features=new Float32Array(dimensions*3);
  for(let i=0;i<dimensions;i++){features[i]=a[i]*b[i];features[i+dimensions]=Math.abs(a[i]-b[i]);features[i+2*dimensions]=Math.fround(a[i]+b[i])/2}
  for(let i=0;i<features.length;i++)features[i]=Math.fround(features[i]-model.mean[i])/model.scale[i];
  let output=model.output_bias;
  for(let j=0;j<model.hidden_bias.length;j++){let hidden=model.hidden_bias[j];for(let i=0;i<features.length;i++)hidden+=features[i]*model.hidden_weights[i][j];output+=Math.max(0,hidden)*model.output_weights[j]}
  return output>=0?1/(1+Math.exp(-output)):Math.exp(output)/(1+Math.exp(output));
 }
 return {embed,compatibility};
}

export function rankCandidates(engine,anchor,items){
 const vector=engine.embed(anchor.name,anchor.category);
 return items.map(item=>({...item,compatibility_score:engine.compatibility(vector,engine.embed(item.name,item.original_category||item.category))})).sort((a,b)=>b.compatibility_score-a.compatibility_score||a.id.localeCompare(b.id));
}
