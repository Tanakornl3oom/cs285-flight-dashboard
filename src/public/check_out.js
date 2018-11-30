

$("#information").click(()=>{
    $("#div-option").show();
    $("#div-information").hide();
    const title =   $("#title").val();
    const firstname =   $("#firstname").val();
    const lastname =   $("#lastname").val();
    const day =   $("#day").val();
    const month =   $("#month").val();
    const year =   $("#year").val();
    const passport =   $("#passport").val();
    const country =   $("#country").val();
    const dayExp =   $("#day-exp").val();
    const monthExp =   $("#month-exp").val();
    const yearExp =   $("#year-exp").val();
    const data = {
        "title" : title,
        "firstname" : firstname,
        "lastname" : lastname,
        "birthDate" : day+"/"+month+"/"+year,
        "passport" : passport,
        "country" : country,
        "passportExp" : dayExp+"/"+monthExp+"/"+yearExp
    }
    console.log(title,firstname,lastname,day,month,year,passport,country,dayExp,monthExp,yearExp);
    console.log(data);
})

$("#option").click(()=>{
    const health =   $("#health-fee").is(':checked')
    const tour =   $("#tour-fee").is(':checked')
    const data ={
        "health" : health,
        "tour" : tour
    }
    console.log("test")
    console.log(data)
})