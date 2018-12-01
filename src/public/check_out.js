var dataInformation = {};

$("#information").click(() => {
  $("#div-option").show();
  $("#div-information").hide();
  const title = $("#title").val();
  const firstname = $("#firstname").val();
  const lastname = $("#lastname").val();
  const day = $("#day").val();
  const month = $("#month").val();
  const year = $("#year").val();
  const passport = $("#passport").val();
  const country = $("#country").val();
  const dayExp = $("#day-exp").val();
  const monthExp = $("#month-exp").val();
  const yearExp = $("#year-exp").val();
  dataInformation = {
    title: title,
    firstName: firstname,
    lastName: lastname,
    birthDate: day + "/" + month + "/" + year,
    passport: passport,
    country: country,
    passportExp: dayExp + "/" + monthExp + "/" + yearExp
  };
});

$("#option").click(() => {
  const flightId = document.URL.split("/flight/")[1].split("/check-out")[0];
  const health = $("#health-fee").is(":checked");
  const tour = $("#tour-fee").is(":checked");
  const dataInsurances = {
    life: health,
    bag: tour
  };
  const data = {
    user: dataInformation,
    insurances: dataInsurances,
    filghtId: flightId
  };
  console.log(data);
});

$("#health-fee").click(() => {
  if ($("#health-fee").is(":checked")) {
    $("#div-health-fee").css("display", "flex");
    $("#total").show();
    if ($("#tour-fee").is(":checked")) {
      $("#fee").text("1,000");
    } else {
      $("#fee").text("650");
    }
  } else {
    $("#div-health-fee").hide();
    if ($("#tour-fee").is(":checked")) {
      $("#fee").text("350");
    } else {
      $("#fee").text("0");
    }
  }
});

$("#tour-fee").click(() => {
  if ($("#tour-fee").is(":checked")) {
    $("#div-tour-fee").css("display", "flex");
    $("#total").show();
    if ($("#health-fee").is(":checked")) {
      $("#fee").text("1,000");
    } else {
      $("#fee").text("350");
    }
  } else {
    $("#div-tour-fee").hide();
    if ($("#health-fee").is(":checked")) {
      $("#fee").text("650");
    } else {
      $("#fee").text("0");
    }
  }
});