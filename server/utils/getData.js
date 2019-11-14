let date = new Date();
var month = new Date(date.getFullYear(), date.getMonth(), 1);
var yesterday = date.setDate(date.getDate() - 1);

const moment = require("moment");
var getDates = function(startDate, endDate) {
  console.log(startDate);
  var dates = [],
    currentDate = startDate,
    addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);

      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    };
  while (currentDate <= endDate) {
    dates.push(moment(currentDate).format("YYYY-MM-DD"));
    currentDate = addDays.call(currentDate, 1);
  }
  console.log({ dates, length: dates.length });
  return dates;
};
var color = function() {
  var colors = [
    "#346b90",
    "#57aefc",
    "#001c32",
    "#939c5b",
    "#9c5b93",
    "#5b939c",
    "#9c645b",
    "#645b9c",
    "#5b9c64",
    "#a2cc61",
    "#f49ac2",
    "#bc8dbf",
    "#8882be",
    "#7ea7d8",
    "#6ecff6",
    "#7bcdc8",
    "#82ca9d",
    "#c4df9b",
    "#fff79a",
    "#fdc68a",
    "#f7977a",
    "#f6989d",
    "#c6b7b7",
    "#4f4f4f",
    "#636363",
    "#213380",
    "#384474",
    "#4f5568",
    "#66655c",
    "#7d7650",
    "#948644",
    "#ab9638",
    "#c2a72c",
    "#d9b720",
    "#0a238c",
    "#f0c814",
    "#b92f1c",
    "#22e0e0",
    "#404040",
    "#480a0d",
    "#e7e009",
    "#d5eb79"
  ];
  var i = Math.floor(Math.random() * colors.length);
  if (i in colors) {
    return colors.splice(i, 1)[0];
  }
  return colors[i];
};
module.exports = {
  month,
  getDates,
  color,
  yesterday
};
