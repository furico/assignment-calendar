function CalDateViewModel(d, a) {
  var self = this;
  self.d = d;
  self.a = a;
}


function CalendarViewModel() {
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
          var vm = new CalDateViewModel(elem.d, elem.a);
          week.push(vm);
        });
        self.weeks.push(elem);
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

  self.remove = function(data, event) {
    console.log('call remove');
    var targetNode = event.currentTarget.parentNode;
    targetNode.parentNode.removeChild(targetNode);
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

  self.showModal = function() {
  };

  updateCalendar();
}

function ModalViewModel() {
  var self = this;
  self.personName = 'Yuigahama';
  self.save = function() {
    alert('save');
  };
}

ko.applyBindings(new CalendarViewModel(), document.getElementById('calendar-view'));
ko.applyBindings(new ModalViewModel(), document.getElementById('modal-view'));
