import { getRepository } from "typeorm"

export async function clearDatabase(){
  
}

export async function getSalt(entitiy:any){
  const response:any[] = await getRepository(entitiy).find({select:["id"], order:{id:"DESC"}, take:1});
  if(response[0]?.id) response[0].id++;
  return JSON.stringify(response[0] || {id:1})
}
