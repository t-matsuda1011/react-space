import AnimateBox from '../../components/AnimateBox';
import { CreateLine } from '../../components/CreateLine';
import './index.scss';

function Gsap() {
    return (
        <div>
            <h1>GSAP Page</h1>
            <div className='flex-box'>
                <AnimateBox
                    text= 'Animate with GSAP'
                    animationType='fadeIn'
                    backgroundColor='blue'
                    shape='circle'
                    width={240}
                    height={240}
                />
                <AnimateBox
                    text= 'Another Animation'
                    animationType='slideIn'
                    backgroundColor='green'
                    shape='square'
                />
                <AnimateBox
                    text= 'Bounce Effect'
                    animationType='bounce'
                    backgroundColor='red'
                    shape='square'
                />
                <AnimateBox
                    text='(^^)/'
                    animationType='circle'
                    backgroundColor='purple'
                    shape='circle'
                    width={50}
                    height={50}
                    fontSize='0.8rem'
                />   
            </div>
            <CreateLine />
        </div>
    );
}

export default Gsap;