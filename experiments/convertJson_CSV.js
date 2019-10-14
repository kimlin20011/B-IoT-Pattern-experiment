if(obj.temperature!==undefined && obj.gps!==undefined){
    //can uploate the str varible
    

    str=obj.mac+","+formatted+","+obj.temperature+","+obj.humidity+","+obj.gps.lat+","+obj.gps.lng+","+"test\n"; 
    console.log(str); 
    try{
        fs.appendFile(`logs/sensorData.csv`, str, function (err) {
            if (err) throw err;
                 console.log('Log Saved!');
        });
            }catch(e){
        console.log(e);
        fs.writeFileSync(`logs/sensorData${formatted2}.csv`,str,(err)=>{console.log(err);});
    }
}