export default interface comment {
    id?:number
    userId?:number
    articleId?:number
    parentId?:number
    replyId?:number
    content:string
    browser:string
    like?:number
    location:string
    avatar?:string
    username?:string
    createTime:string;
}
