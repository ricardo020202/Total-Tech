$(document).ready(function () {
   var date = new Date();
   var year = date.getFullYear();
   var month = date.getMonth();
   var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];

   function updateCalendar() {
      var firstDayOfMonth = new Date(year, month, 1);
      var daysInMonth = new Date(year, month + 1, 0).getDate();
      var daysInLastMonth = new Date(year, month, 0).getDate();
      var dayOfWeek = firstDayOfMonth.getDay();
      var date = 1;
      var lastMonthStart = daysInLastMonth - dayOfWeek + 1;
      var nextMonthDate = 1;

      $(".current-month h2").text(monthNames[month] + " " + year);
      $(".days").empty();

      for (var i = 0; i < 6; i++) {
         for (var j = 0; j < 7; j++) {
            var dayDiv = $("<div></div>");
            if (i === 0 && j < dayOfWeek) {
               dayDiv.text(lastMonthStart).addClass("last-month");
               lastMonthStart++;
            } else if (date > daysInMonth) {
               dayDiv.text(nextMonthDate).addClass("next-month");
               nextMonthDate++;
            } else {
               dayDiv.text(date).addClass("this-month");
               if (
                  date === new Date().getDate() &&
                  year === new Date().getFullYear() &&
                  month === new Date().getMonth()
               ) {
                  dayDiv.addClass("today");
               }
               date++;
            }
            $(".days").append(dayDiv);
         }
      }
   }

   updateCalendar();

   $(".prev-month").click(function () {
      if (month === 0) {
         month = 11;
         year--;
      } else {
         month--;
      }
      updateCalendar();
   });

   $(".next-month").click(function () {
      if (month === 11) {
         month = 0;
         year++;
      } else {
         month++;
      }
      updateCalendar();
   });
});
