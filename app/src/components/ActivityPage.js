import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import NewActivityForm from '~/containers/NewActivityForm';
import DayWithActivities from '~/components/DayWithActivities';

import { getActivitiesByDay } from '~/reducers';


function ActivityPage(props) {
  const { activitiesByDay } = props;
  const daysWithActivities = Object.keys(activitiesByDay)
    .sort((a, b) => b - a)
    .map(day =>
      <DayWithActivities day={day} activities={activitiesByDay[day]} />
    );

  return (
    <div className="grid mt">
      <Helmet title={`Activities`} />
      <div className="grid__item grid__item--1-1">
        <NewActivityForm />
      </div>
      <div className="grid__item grid__item--1-1">
        {daysWithActivities}
      </div>
    </div>
  );
}

ActivityPage.propTypes = {
  activitiesByDay: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    activitiesByDay: getActivitiesByDay(state),
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityPage);
