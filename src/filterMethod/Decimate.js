export const Decimate=(data,decimate)=>{
    return data.map((e,i)=>{
        if(i%decimate==0){
            return NaN
        }else{
            return e
        }
    })
}