import React from 'react';

const getDate = (date, { day = true, month = true, year = true } = {}) =>
	date.toLocaleDateString('en-US', {
		day: day ? 'numeric' : undefined,
		month: month ? 'long' : undefined,
		year: year ? 'numeric' : undefined
	});
const EventDate = ({ startDate, endDate }) => {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const isOneDay = start.toDateString() === end.toDateString();
	return (
		<React.Fragment>
			<time dateTime={start.toISOString()}>{getDate(start, { year: isOneDay })}</time>
			{!isOneDay && (
				<React.Fragment>
					–
					<time dateTime={end.toISOString()}>
						{getDate(end, { month: start.getMonth() !== end.getMonth() })}
					</time>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};
const Event = ({ name, location, url, startDate, endDate }) => (
	<div>
		<h2>
			{name} ({location})
		</h2>
		<p>
			<EventDate startDate={startDate} endDate={endDate} />
		</p>
		<p>
			Website: <a href={url}>{url}</a>
		</p>
	</div>
);

export default Event;
