
export const getCodeFromValue=(val)=>{
    let code ="";
    let temp=val;
    if(val==0)
        return "A";
    while(temp>0)
    {
        if(temp%26===0){
            code+= String.fromCharCode(26+64);
            temp=Math.floor((temp/26)-1);
        }else{
            code+= String.fromCharCode(temp%26+64);
            temp=Math.floor((temp/26));
        }
    }
    return code.split("").reverse().join("");
}

export const getPosition = ({row,col,rows})=>{
    return (parseInt(col)-1)*parseInt(rows)+parseInt(row);
}

export const getDefaultLayout = (id) =>{
    return {
        id,
        row:20,
      cols:6,
      blocked:[]
    }
}
