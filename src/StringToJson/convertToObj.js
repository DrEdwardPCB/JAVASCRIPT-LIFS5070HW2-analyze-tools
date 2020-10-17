export const convertToObj=(text)=>{
    var line=text.split("\n")
    console.log(line)
    var DataArray=[]
    for(var i=0;i<line.length;i++){
        if(line[i].includes("#Begin Write")){
            continue;
        }else if(line[i].includes("X_force")){
            continue;
        }else if(line[i].includes("#End Write")){
            break;
        }else{
            var datapt=line[i].split('\t')
            var obj={
                //CycleCount/n	X_force	Y_force	A_dist-Y	B_dist-Y	Status
                CycleCount:datapt[0],
                X_force:datapt[1],
                Y_force:datapt[2],
                A_distY:datapt[3],
                B_distY:datapt[4],
            }
            DataArray.push(obj)
        }
    }
    return DataArray
}