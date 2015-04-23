function ViewModel() {
  var self = this;
  var today = new Date();
  var updateCalendar = function() {
    $.getJSON("/month", {
      year: self.currentYear(),
      month: self.currentMonth(),
    }, function(data) {
      self.weeks.removeAll();
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

  updateCalendar();
}

ko.components.register('assignee', {
  viewModel: function(params) {
    this.name = params.value;
    this.remove = function() {
      alert('remove!');
    };
  },
  template:
    '<div class="calendar-assignee">\
       <span data-bind="text: name"></span>\
       <button class="close-btn" data-bind="click: remove"><i class="fa fa-times-circle"></i></button>\
    </div>'
});


ko.applyBindings(new ViewModel());
