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

function Cal() {

  const localizer = momentLocalizer(moment)

  let allViews = Object.keys(Views).map(k => Views[k])

  const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightorange',
    },
  })

    return (
          <Calendar
            localizer={localizer}
            views={allViews}
            defaultView={'week'}
            step={60}
            events={events}
            components={{
              timeSlotWrapper: ColoredDateCellWrapper,
            }}
            startAccessor="start"
            endAccessor="end"
          />
    )
}

export default Cal;