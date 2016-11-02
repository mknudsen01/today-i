// grab the activities from local storage
const activityByDay = localStorage.getItem('activityByDay') ? JSON.parse(localStorage.getItem('activityByDay')) : {};
const activitiesHolder = document.querySelector('#activities');

const clearActivitiesHolder = () => {
  activitiesHolder.innerHTML = '';
};

function paintActivities() {
  Object.keys(activityByDay).forEach((day) => {
    const activities = activityByDay[day];
    const dateHolder = document.createElement('h3');
    const eventDate = new Date(parseInt(day));
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    activitiesHolder.appendChild(dateHolder);
    dateHolder.innerHTML = eventDate.toLocaleDateString('en-US', dateOptions);

    activities.forEach((activity) => {
      const eventTemplate = document.querySelector('#activity-template').cloneNode(true).innerHTML;
      const populatedTemplate = eventTemplate.replace('{{activity}}', activity);

      const eventTextHolder = document.createElement('div');
      eventTextHolder.innerHTML = populatedTemplate;
      activitiesHolder.appendChild(eventTextHolder);
      eventTextHolder.setAttribute('id', 'activity');
      eventTextHolder.setAttribute('class', 'grid grid--center');
    });
  });
}

// paint activities on initial page load
paintActivities();

document.querySelector('#activity-form').addEventListener('submit', () => {
  // prevent form submission/page reload
  event.preventDefault();

  // save the current date (start of the day)
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDayTimestamp = startOfDay.getTime();

  // grab text input's value
  const textInput = document.querySelector('input[name="activity"]');

  const activityContent = textInput.value;
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
});
