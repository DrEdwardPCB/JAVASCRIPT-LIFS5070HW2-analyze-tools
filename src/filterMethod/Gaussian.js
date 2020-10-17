export const GaussianFilter=(data,kernal,sigma)=>{
    var kernalVal=[]
    console.log(kernal,sigma)
    if(kernal%2==0){
        console.log(kernal)
        console.log(kernal%2)
        throw new Error('cannot be even kernal size')
    }
    var starting = -Math.floor(kernal/2)
    for(var i=0;i<kernal;i++, starting++){
        kernalVal[i]=(1/Math.sqrt(2*Math.PI*sigma))*Math.pow(Math.E,(-((starting*starting)/(2*sigma*sigma))))
    }
    console.log(kernalVal)
    var ReadyForKernal=data.map((e,i,arr)=>{
        var eachKernal=[]
        for(var j=0;j<kernal;j++){
            if(i+j-Math.floor(kernal/2)<0){
                
            }else if(i+j-Math.floor(kernal/2)>=arr.length){
                eachKernal.push(0)
            }else{
                eachKernal.push(arr[i+j-Math.floor(kernal/2)])
            } 
        }
        return eachKernal
    })
    return ReadyForKernal.map(e=>{
        return e.map((f,i)=>{
            return f*kernalVal[i]
        }).reduce((accum,curr)=>{
            return accum+=curr
        },0)
    })
}