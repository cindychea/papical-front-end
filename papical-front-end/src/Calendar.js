import React from 'react';
import {
  Calendar,
  DateLocalizer,
  momentLocalizer,
  globalizeLocalizer,
  move,
  Views,
  Navigate,
  components,
} from 'react-big-calendar'
import moment from "moment";
import events from './events-temp'
import "react-big-calendar/lib/css/react-big-calendar.css";


function Calendars() {

  const localizer = momentLocalizer(moment)

  let allViews = Object.keys(Views).map(k => Views[k])

  const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

  const MyCal = () => {
    return (
      <div id="calendar-box">
        <Calendar
          localizer={localizer}
          views={allViews}
          step={60}
          events={events}
          components={{
            timeSlotWrapper: ColoredDateCellWrapper,
          }}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    )
  }

  return (
    <React.Fragment>
      <h2>Calendar</h2>
      {MyCal()}
    </React.Fragment>
  )
}

export default Calendars;