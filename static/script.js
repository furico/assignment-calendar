function ViewModel() {
  var self = this;
  var today = new Date();
  var getMonthWeeks = function() {
    $.getJSON("/month", {
      year: self.currentYear(),
      month: self.currentMonth(),
    }, function(data) {
      data.result.forEach(function(elem, index) {
        self.weeks.push(elem);
      });
    });
  }

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

  self.weeks = ko.observableArray();
  
  self.updateCalendar = function() {
    self.weeks.removeAll();
    getMonthWeeks(self);
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

  getMonthWeeks();
}

var vm = new ViewModel();
ko.applyBindings(vm);
// getMonthWeeks(vm);
