export function sleep(duration:number){
    return new Promise((res,rej)=>{
        setTimeout(()=>{res('')},duration)
    })
}