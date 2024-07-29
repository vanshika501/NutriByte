import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import '../App.css';

const scroll = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["50%", "-55%"]);

  return (
    <section ref={targetRef} className="relative h-[600vh] z-20 bg-[#fbfada]">
      <h1 className="text-center text-8xl sticky top-0 text-[#12372a] pt-4">Success Stories</h1>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 bg-[#fbfada]">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="relative h-96 w-96 overflow-hidden"
    >
      <div
        style={{
          background: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
        className="pic absolute inset-0 z-0 transition-all shadow-black duration-300 hover:scale-110 hover:brightness-[.6]"
      ></div>
    </div>
  );
};

export default scroll;

const cards = [
  {
    url: "https://static.boredpanda.com/blog/wp-content/uploads/2017/05/before-after-body-building-fitness-transformation-1-5912d6a730c00__700.jpg",
    id: 1,
    para: "John, a software engineer, was always busy with his work and didn't have time to take care of his health. He was underweight. But after following a healthy diet and exercising regularly, he gained 30 pounds and his confidence grew significantly. He feels more energetic and confident now."

  },
  {
    url: "https://static.boredpanda.com/blog/wp-content/uploads/2017/05/before-after-body-building-fitness-transformation-95-591c13211dfdc__700.jpg",
    id: 2,
    para: "Mike, a college student, was always tired and lacked energy. He realized that his diet was the problem and decided to make a change. He started eating more fruits, vegetables, and lean proteins, and cut down on processed foods and sugary drinks. He lost 15 pounds and gained muscle mass. He feels more focused and energetic in class."
  },
  {
    url: "https://qph.cf2.quoracdn.net/main-qimg-cdf348384909e7f3e002cd9e4ac1bcd3-lq",
    id: 3,
    para: "Mark, a graphic designer, was always skinny and had a hard time gaining weight. He decided to take control of his health and started eating a high-calorie diet and working out. He gained 20 pounds of muscle mass and feels more confident and stronger than ever before."  
  },
  {
    url: "https://suprahuman.com/wp-content/uploads/2023/05/suprahuman-before-and-after-35.png",
    id: 4,
    para: "James, a construction worker, was always active but didn't pay attention to his diet. He was unsatisfied with his appearance. But after following a healthy diet and exercising regularly, He feels more energetic and stronger at work."
  },
  {
    url: "https://static.vecteezy.com/system/resources/previews/040/338/694/non_2x/ai-generated-woman-in-shorts-shows-toned-legs-after-weight-loss-transformation-photo.jpg",
    id: 5,
    para: "Sarah, a mother of two, was struggling with her weight after giving birth to her second child. She decided to take control of her health and started eating healthy and working out. She lost 20 pounds and gained muscle mass. She feels stronger and happier than ever before."
  },
  {
    url: "https://static.boredpanda.com/blog/wp-content/uploads/2017/05/before-after-body-building-fitness-transformation-49-59156bbe6f52c__700.jpg",
    id: 6,
    para: "Alice, an online influencer was underweight and was not satisfied about her eating habits. She started weight gaining diet and after just 4 weeks she gained over 8kgs and gave her a confidnce boost. Now she is an onlyfans model."
  },
  {
    url: "https://womenshealth.com.au/wp-content/uploads/2022/10/wh-transformation-square-1549667036.jpg",
    id: 7,
    para:"Lisa, a nurse, was always on her feet but didn't have time to exercise or eat healthy. She was insecure about her physique. But after following a healthy diet and working out, she lost 15 pounds. She feels happier and satisfied at work now."
  },
];

