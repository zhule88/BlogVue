export default interface comment {
    id?:number
    userId?:number
    articleId?:number
    parentId?:number
    replyId?:number
    content:string
    browser:string
    location:string
    createTime:string;
}
