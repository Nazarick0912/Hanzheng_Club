import './Timeline.css'

const Timeline = () => {
    const memories = [
        {
            date: "Oct 2024", 
            title: "USM Orientation Week", 
            desc: "First week meet each other",
            images: [
                "/memories/Oct2024-1-1.jpg",
                "/memories/Oct2024-1-2.jpg",
                "/memories/Oct2024-1-3.jpg"
            ]
        },
        {date: "Nov 2024", title: "USM Y1S1 W1", desc: "First week of lecture"},
        {date: "Nov 2024", title: "邪恶炸鸡皮", desc: "Delicious Fried Chicken Skin"},
        {date: "Dec 2024", title: "Q1 Mookata", desc: "Super full"},
        {date: "Jan 2025", title: "2025 - Happy New Year!", desc: "Celebrating new year at Straits Quay"},
        {date: "Jan 2025", title: "Meet with CS Buddy", desc: "Having dinner and chit chat with buddies"},
    ];

    return (
        <section className="timeline-section">
            <h2 className='section-title'>Timeline</h2>

            <div className='timeline-container'>
                {memories.map((item, index) => {
                    const isSameDate = index > 0 && memories[index - 1].date === item.date;

                    return (
                        <div key={index} className="memory-item">
                            <div className={`memory-date ${isSameDate ? 'date-hidden' : ''}`}>
                                {item.date}
                            </div>

                            <div className="memory-content">
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>

                            {item.images && item.images.length > 0 && (
                                <div className="image-gallery">
                                    {item.images.map((imgSrc, imgIndex) => (
                                        <img 
                                            key={imgIndex} 
                                            src={imgSrc} 
                                            alt={`${item.title} ${imgIndex}`} 
                                            className="memory-img"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    )
}

export default Timeline