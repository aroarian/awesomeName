$(document).ready(function() {
   
    var dateFormat = moment().format("YYYY-MM-DD");
    console.log(dateFormat);
     // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD03YeHV7Xev6_HtPJfj8GYTMu3-U-sbYA",
    authDomain: "employee-89c84.firebaseapp.com",
    databaseURL: "https://employee-89c84.firebaseio.com",
    projectId: "employee-89c84",
    storageBucket: "employee-89c84.appspot.com",
    messagingSenderId: "311518177396"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  
  database.ref().on("child_added", function(snapshot) {
     $(".table").append(
      "<tr><td>" +snapshot.val().newEmployee +"</td><td>" +
        snapshot.val().role + "</td><td>" + snapshot.val().startDate + "</td><td>" + snapshot.val().empRate +"</td><td>"
        + snapshot.val().numMonths + "</td><td>" + snapshot.val().totalBilled + "</td></tr>"
    );
  });

  $(".employee").on("submit", function(event) {
    event.preventDefault();
   
    var newEmployee = $("#empName").val().trim();
    var role = $("#empRole").val().trim();
    var startDate = $("#empDate").val();
    var empRate = $("#empRate").val().trim();

    // var numMonths = moment.duration().asMonths(Date) - moment.duration().asMonths(startDate);
    var numMonths = moment(dateFormat).diff(startDate, "months");

   
    // var roundDown = (numMonths);
    var totalBilled = (numMonths * empRate);

    database.ref().push({
        newEmployee: newEmployee,
        role: role,
        startDate: startDate,
        empRate: empRate,
        numMonths: numMonths,
        totalBilled: totalBilled
    });

    $("#empName").val("")
    $("#empRole").val("")
    $("#empDate").val("")
    $("#empRate").val("");
  });
});
