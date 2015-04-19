function getMonthWeeks(year, month) {
  var weeks3 = [
    [23, 24, 25, 26, 27, 28, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 21, 1, 2, 3, 4, 5],
  ];

  var weeks4 = [
    [30, 31, 1, 2, 3, 4, 5],
    [6, 7, 8 ,9 ,10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 1, 2, 3],
  ];

  var weeks5 = [
    [27, 28, 29, 30, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31],
  ];

  switch (month) {
    case 3:
      return weeks3;
    case 5:
      return weeks5;
    default:
      return weeks4;
  }
}

function ViewModel() {
  var self = this;
  var today = new Date();
  self.currentYear = ko.observable(today.getFullYear());
  self.currentMonth = ko.observable(today.getMonth() + 1);

  self.formattedMonth = ko.pureComputed(function() {
    if (self.currentMonth() < 1) {
      self.currentYear(self.currentYear() - 1);
      self.currentMonth(12);
    }

    if (self.currentMonth() > 12) {
      self.currentYear(self.currentYear() + 1);
      self.currentMonth(1);
    }

    return self.currentYear() + "年 " + self.currentMonth() + "月";
  });

  self.weeks = ko.observableArray(getMonthWeeks(self.currentYear(), self.currentMonth()));
  
  self.updateCalendar = function() {
    self.weeks.removeAll();
    var currentMonthWeeks = getMonthWeeks(self.currentYear(), self.currentMonth());
    currentMonthWeeks.forEach(function(elem, index) {
      self.weeks.push(elem);
    });
  };

  self.resetMonth = function() {
    var today = new Date();
    self.currentYear(today.getFullYear());
    self.currentMonth(today.getMonth() + 1);
    self.updateCalendar();
  };

  self.moveMonth = function(step) {
    var tmpMonth = self.currentMonth() + step;
    if (tmpMonth < 1) {
      self.currentYear(self.currentYear() - 1);
      self.currentMonth(12);
    }
    else if (tmpMonth > 12) {
      self.currentYear(self.currentYear() + 1);
      self.currentMonth(1);
    }
    else {
      self.currentMonth(tmpMonth);
    }
    self.updateCalendar();
  };
}

ko.applyBindings(new ViewModel());
