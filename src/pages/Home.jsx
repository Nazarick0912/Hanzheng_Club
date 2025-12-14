import hanzheng_pic from '../assets/hanzheng.jpg'
import Timeline from '../components/Timeline/Timeline'

function Home() {
    return (
        <div>
            <section>
                <h1 className="title">HanZheng Club</h1>
                <div className="member-container">
                    <div className="member-card">
                        <img src={hanzheng_pic} alt="" className='member-picture'/>
                        <h2 className='member-name'>Hanzheng</h2>
                        <h2 className='member-role'>Founder</h2>
                        <p className='member-desciption'>The founder of HanZheng club</p>
                    </div>

                    <div className="member-card">
                        <img src={hanzheng_pic} alt="" className='member-picture'/>
                        <h2 className='member-name'>Hanzheng</h2>
                        <h2 className='member-role'>Founder</h2>
                        <p className='member-desciption'>The founder of HanZheng club</p>
                    </div>
                </div>
            </section>
            
            <Timeline />
        </div>
    )
}

export default Home