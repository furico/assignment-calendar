function CalDateViewModel(d, a) {
  var self = this;
  self.d = d;
  self.a = a;
}


function CalendarViewModel(year, month) {
  var self = this;
  self.currentYear = ko.observable(year);
  self.currentMonth = ko.observable(month);
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

}

var vm;

var updateCalendar = function() {
  $.getJSON("/month", {
    year: vm.currentYear(),
    month: vm.currentMonth(),
  }, function(data) {
    vm.weeks.removeAll();
    data.result.forEach(function(elem, index) {
      var week = [];
      elem.forEach(function(elem, index) {
        var vm = new CalDateViewModel(elem.d, elem.a);
        week.push(vm);
      });
      vm.weeks.push(elem);
    });
  });
}

var viewInit = function() {
  var today = new Date();
  vm = new CalendarViewModel(today.getFullYear(), today.getMonth() + 1)
  updateCalendar();
}();

function ModalViewModel() {
  var self = this;
  self.personName = 'Yuigahama';
  self.save = function() {
    alert('save');
  };
}

ko.applyBindings(vm, document.getElementById('calendar-view'));
ko.applyBindings(new ModalViewModel(), document.getElementById('modal-view'));
