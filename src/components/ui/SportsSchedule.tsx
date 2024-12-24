const SportsSchedule = () => {
    // Static schedule data
    const schedule = [
      {
        date: '2024-11-01',
        events: [
          { time: '10:00 AM', sport: 'BGMI', description: 'Semi-Finals' },
          { time: '02:00 PM', sport: 'Cricket', description: 'Quarter Finals' },
        ],
      },
      {
        date: '2024-11-05',
        events: [
          { time: '11:00 AM', sport: 'FIFA', description: 'Group Stage' },
          { time: '03:00 PM', sport: 'Volleyball', description: 'Final Match' },
        ],
      },
      {
        date: '2024-11-10',
        events: [
          { time: '09:00 AM', sport: 'Valorant', description: 'Finals' },
          { time: '01:00 PM', sport: 'Basketball', description: 'Championship' },
        ],
      },
    ];
  
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Sports Schedule</h2>
        {/* Container with fixed height and overflow hidden */}
        <div className="relative h-80 overflow-hidden">
          {/* Scrolling content */}
          <div className="vertical-scroll">
            {schedule.map((day, index) => (
              // Individual day card
              <div key={index} className="mb-6">
                <div className="bg-black p-4 rounded-lg shadow">
                  <h3 className="text-xl font-medium mb-4">
                    {new Date(day.date).toDateString()}
                  </h3>
                  {/* Events list with green bullets */}
                  <ul className="space-y-4">
                    {day.events.map((event, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-1 mr-4"></div>
                        <div>
                          <span className="font-semibold">{event.time}</span> - 
                          {event.sport}: {event.description}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Divider between days */}
                {index < schedule.length - 1 && (
                  <div className="h-2 bg-white rounded-full my-4"></div>
                )}
              </div>
            ))}
          </div>
          {/* CSS Animation */}
          <style jsx>{`
            @keyframes verticalScroll {
              0% { transform: translateY(0); }
              100% { transform: translateY(-100%); }
            }
            .vertical-scroll {
              animation: verticalScroll 1s linear infinite;
              display: flex;
              flex-direction: column;
            }
            .vertical-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      </div>
    );
};
  
export default SportsSchedule;
