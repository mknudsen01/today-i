// grab the activities from local storage
var activityByDay = localStorage.getItem('activityByDay') ? JSON.parse(localStorage.getItem('activityByDay')) : {};
var activitiesHolder = document.querySelector('#activities');

// paint activities on initial page load
paintActivities();

function clearActivitiesHolder() {
  activitiesHolder.innerHTML = '';
};

function paintActivities() {
  for (var day in activityByDay) {
    var activities = activityByDay[day];
    var dateHolder = document.createElement("h3");
    var eventDate = new Date(parseInt(day));
    var dateOptions = { year: "numeric", month: "long", day: "numeric" };
    activitiesHolder.appendChild(dateHolder);
    dateHolder.innerHTML = eventDate.toLocaleDateString("en-US", dateOptions);

    for (var i = 0, activitiesLength = activities.length; i < activitiesLength; i++) {
      var activity = activities[i];
      var eventTemplate = document.querySelector("#activity-template").cloneNode(true).innerHTML;
      populatedTemplate = eventTemplate.replace("{{activity}}", activity);

      var eventTextHolder = document.createElement("div");
      eventTextHolder.innerHTML = populatedTemplate;
      activitiesHolder.appendChild(eventTextHolder);
      eventTextHolder.setAttribute("id", "activity");
      eventTextHolder.setAttribute("class", "grid grid--center");
    }
  }
};

document.querySelector("#activity-form").addEventListener('submit', function() {
  // prevent form submission/page reload
  event.preventDefault();

  // save the current date (start of the day)
  var now = new Date();
  var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var startOfDayTimestamp = startOfDay.getTime();

  // grab text input's value
  var textInput = document.querySelector('input[name="activity"]');

  var activityContent = textInput.value;
  textInput.value = '';

  if (!activityContent) {
    return;
  }



  // add activity and date to our activities collection, which is now in localStorage
  if (activityByDay[startOfDayTimestamp]) {
    activityByDay[startOfDayTimestamp].push(activityContent);
  } else {
    activityByDay[startOfDayTimestamp] = [activityContent];
  }
  localStorage.setItem('activityByDay', JSON.stringify(activityByDay));

  // clear out the activity holder
  clearActivitiesHolder();

  // loop through activity collection and write a paragraph for each one in the list
  paintActivities();
})
