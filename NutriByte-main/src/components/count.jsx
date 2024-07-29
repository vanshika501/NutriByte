import React, { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup';
import { AnimatePresence, motion, useInView } from 'framer-motion'

const Numbers = ({ num, name, s }) => {
    const ref = useRef(null);
    const isInView = useInView(ref);
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-12 font-sans">
            <div ref={ref}> 
                {isInView && <CountUp 
                duration={3} end={num} suffix={s} className='text-4xl font-medium text-[#FBFADA]' />}
            </div>
            <p className='text-lg text-[#FBFADA]'>{name}</p>
        </div>
    )
}


const Slide = ({ anim, ques, ans }) => {

    const [visible, setVisible] = useState(false);
    return (
        <motion.div initial={{ opacity: 0, x: `${anim}` }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.85, 0, 0.15, 1] }} className="w-[46rem] p-4 bg-[#FBFADA]  rounded-md relative">
            <div className='flex w-full justify-between items-center'>
                <h1 className='text-xl font-medium '>{ques}</h1>
                <i onClick={() => setVisible(!visible)} className='fa-solid fa-plus text-2xl w-8 rounded-full text-center text-[#fbfada] bg-[#12372a]'></i>
            </div>
            <AnimatePresence>
                {visible && <motion.p
                    animate={{ y: 0, opacity: 1 }}
                    initial={{ y: 100, opacity: 0 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: .5, ease: [0.85, 0, 0.15, 1] }}
                    className='font-light mt-3 text-justify'>{ans}</motion.p>}
            </AnimatePresence>
        </motion.div>
    )
}

function count() {

    return (
        <div className="h-[200vh] relative z-20 bg-[#12372a]">
            <div className='sticky top-0 flex flex-col items-center gap-14'>
                <h1 className='text-[#FBFADA] text-base font-thin mt-4'><span className='text-6xl font-normal'>F</span>requently <span className='text-6xl font-normal'>A</span>sked <span className='text-6xl font-normal'>Q</span>uestions</h1>
                <div className="flex flex-col gap-6">
                    <Slide anim="100%" ques="How many meals a day should I eat?" ans="We suggest that you eat the number of meals that you are comfortable eating and that fits into your daily schedule. Normally, we recommended 3 meals a day and a healthy snack or two. If you are an athlete it may be worth paying a bit more attention to the timing of your nutrition before and after training sessions. " />
                    <Slide anim="-100%" ques="How much exercise should i do?" ans="To lose weight you don't necessarily have to go to the gym but we would recommend at least trying to be more active during the day and increasing the amount of walking you do. Best results tend to come from people who also undertake a basic weight training and cardiovascular exercise programme. The main point to take away here though is that you don't need to exercise excessively to get results!" />
                    <Slide anim="100%" ques="How does the meal planner work?" ans="Each diet plan selected can be customised according to things such as your personal statistics, current physical condition, activity levels and whether you want to lose fat, stay in shape, or gain muscle. It can be personalised to whether you are a vegan or not, if you have any allergies such as gluten, also including the option for halal and kosher recipes only." />
                    <Slide anim="-100%" ques="Do you provide a personal trainer?" ans="No, we do not provide a personal trainer, As our website is designed while keeping our users in mind. The website offers an easy-to-use and user friendly experience." />
                </div>
                <motion.div initial={{ opacity: 0, y: 100 }} transition={{ duration: .5 }} whileInView={{ opacity: 1, y: 0 }} className="flex">
                    <Numbers num="984" name="Active Users" s="k+" />
                    <Numbers num="7" name="Satisfied Customers" s="M+" />
                    <Numbers num="32" name="NutriByte Community" s="M+" />
                    <Numbers num="97" name="Success Rate" s="k+" />
                </motion.div>
            </div>
        </div>
    )
}

export default count