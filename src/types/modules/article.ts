 export default interface article{
  id?: number,
  categoryId?: number,
  title: string,
  image: string,
  content: string,
  state?: number,
  top: number | boolean,
  visitCount?:number,
  createTime?:string,
  updateTime?:string
}
