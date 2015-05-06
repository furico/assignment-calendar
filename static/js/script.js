function CalDateViewModel(data) {
  var self = this;
  self.year = data.year;
  self.month = data.month;
  self.date = data.date;
  self.memberList = ko.observableArray(data.memberList);
}

function CalendarViewModel(modalVM) {
  var self = this;

  var updateCalendar = function() {
    $.getJSON("/month", {
      year: self.currentYear(),
      month: self.currentMonth(),
    }, function(data) {
      self.weeks.removeAll();
      data.result.forEach(function(elem, index) {
        var week = [];
        elem.forEach(function(elem, index) {
          var vm = new CalDateViewModel(elem);
          week.push(vm);
        });
        self.weeks.push(week);
      });
    });
  }

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

  self.weeks = ko.observableArray();

  self.remove = function(data, parentData) {
    parentData.memberList.remove(data);
  };

  self.resetMonth = function() {
    var today = new Date();
    self.currentYear(today.getFullYear());
    self.currentMonth(today.getMonth() + 1);
    updateCalendar();
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
    updateCalendar();
  };

  self.showModal = function(data, event) {
    modalVM.vm = data;
    $('#modal-view').modal('toggle')
  };

  ko.applyBindings(modalVM, document.getElementById('modal-view'));
  updateCalendar();
}

function ModalViewModel() {
  var self = this;
  self.member = ko.observable();
  self.vm = null;
  self.save = function() {
    self.vm.memberList.push(self.member());
    self.member('')
    $('#modal-view').modal('toggle')
  };
}

ko.applyBindings(new CalendarViewModel(new ModalViewModel()), document.getElementById('calendar-view'));
