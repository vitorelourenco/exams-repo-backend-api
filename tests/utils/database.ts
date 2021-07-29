import { getRepository } from "typeorm"

export async function clearDatabase(){
  
}

export async function getSalt(entitiy:any){
  const response:any[] = await getRepository(entitiy).find({select:["id"], order:{id:"DESC"}, take:1});
  const salt:{pid:number} = {pid:1};
  const id = response[0]?.id;
  if(id) {
    salt.pid = id;
  }
  return JSON.stringify(salt)
}
