import './Timeline.css'

const Timeline = () => {
    const memories = [
        {date: "Oct 2024", title: "USM Orientation Week", desc: "First week meet each other"},
        {date: "Nov 2024", title: "USM Y1S1 W1", desc: "First week of lecture"},
        {date: "Nov 2024", title: "邪恶炸鸡皮", desc: "Delicious Fried Chciken Skin"},
        {date: "Dec 2024", title: "Q1 Mookata", desc: "Super full"},
        {date: "Jan 2025", title: "2025 - Happy New Year!", desc: "Celeebrating new year at Straits Quay"},
    ];

    return (
        <section className="timeline-section">
            <h2>Timeline</h2>

            <div className='timeline-container'>
                {memories.map((item, index)=> (
                    <div key={index} className="memory-item">
                        <div className="memory-date">{item.date}</div>
                        <div className="memory-content">
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    </div>
            ))}
            </div>
        </section>
    )
}

export default Timeline