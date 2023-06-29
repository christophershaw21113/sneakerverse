import React from 'react'
import { useMediaQuery } from 'react-responsive';


const About = () => {
    const isSmallScreen = useMediaQuery({ maxWidth: '965px' });
    const pageContainer = {
        marginTop: isSmallScreen ? '40%' : '10%',
        width: '80%'
    };
    return (
        <div style={pageContainer}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Meet the team!</h1>
            <div style={{ display: 'flex', alignItems: 'center', paddingTop: '15px' }}>
                <div style={{ marginRight: '30px' }}>
                    <img style={{ padding: '10px' }} alt='' src='http://localhost:8000/uploads/default.png' width='75px' />
                </div>
                <div>
                    <h3>Chris - Front End, Styling, Back End</h3>
                    <p>Hi, I'm Chris, a full-stack software engineer with a focus in MERN. I enjoy spending time with my wife, family, and friends. Some of my hobbies include cooking, weightlifitng, and running. My favorite sneaker at the moment would have to be Ultraboost DNA due to the design and comfortability all while being a lightweight running shoe. Check out my <a target='_blank' href='https://www.linkedin.com/in/chris-shaw-18370a107/'>LinkedIn</a> and <a target='_blank' href='https://github.com/christophershaw21113'>Github</a> profiles. Portfolio page coming soon... </p>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', paddingTop: '15px' }}>
                <div style={{ marginRight: '30px' }}>
                    <img style={{ padding: '10px' }} alt='' src='http://localhost:8000/uploads/default.png' width='75px' />
                </div>
                <div>
                    <h3>Tyler - Front End & Back End</h3>
                    <p>Hi, I'm Tyler, a full-stack JavaScript developer. In my spare time, I enjoy sports, hiking and electrical projects. You can check out my <a target='_blank' rel='noreferrer' href="https://tylerw.xyz">portfolio website</a>, <a target='_blank' rel='noreferrer' href="https://github.com/tylerwertman">code on Github</a>, and professional experience on <a target='_blank' rel='noreferrer' href="https://www.linkedin.com/in/tyler-wertman/">LinkedIn</a>. My favorite sneaker is the Yeezy 750 due to the uniquity of the strap paired with a boot-like silhouette.</p>
                </div>
            </div>

            <div>
                <h3>Cesar - Front End</h3>
                <p>Hi! I'm Cesar, a full-stack Javascript developer. I enjoy spending time with my wife and three toddlers. 
                    I also enjoy my spare time by playing soccer with friends or watching sports. 
                    My favorite shoe is the popular Jordan 11 "Bred". 
                    Born and raised in Chicago, the Jordan 11 "Bred" represents the comeback of Michael Jordan winning 
                    the 1996 Finals MVP and leading the Chicago Bulls to a fourth championship title. 
                    Check out my <a target='_blank' href='https://github.com/cas3rvin'>Github</a> profile! </p>
=======
            <div style={{ display: 'flex', alignItems: 'center', paddingTop: '15px' }}>
                <div style={{ marginRight: '30px' }}>
                    <img style={{ padding: '10px' }} alt='' src='http://localhost:8000/uploads/default.png' width='75px' />
                </div>
               
                </div>
            </div>
        </div>
    )
}

export default About