import { useState, useEffect } from 'react'
import "../App.css"


const AdviceContainer = () => 
{
    const [adviceID, setAdviceID] = useState('');
    const [advice, setAdvice] = useState("");
    const [dividePart, setDividePart] = useState('/images/pattern-divider-desktop.svg');

    const grabAdviceData = async () => 
    {
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();
        console.log(data)

        setAdviceID(data.slip.id);
        setAdvice(`"${data.slip.advice}"`);
    }

    useEffect(() => 
    {
        grabAdviceData();
    }, []);

    useEffect(() => //Resize function
    {
        const handleResize = () => 
            setDividePart(window.innerWidth < 768 
                ? '/images/pattern-divider-mobile.svg' 
                : '/images/pattern-divider-desktop.svg');
    
        handleResize(); // initial divider
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
        <div className="w-[350px] md:w-[550px] h-auto max-h-[900px] bg-[#313A49] rounded-lg flex flex-col items-center relative">

            <p className="text-[#52ffa8] font-medium text-[16px] my-10">A D V I C E  # {adviceID}</p>
            <p className='text-[#cee3e9] font-semibold text-[28px] text-center w-[90%]'>{advice}</p>

            <img src={dividePart} alt="divider" className='mt-10 mb-20' />

            <div className="bg-[#52ffa8] rounded-[50%] h-[60px] w-[60px] flex items-center justify-center absolute bottom-[-30px] cursor-pointer hover:shadow-[0_0_40px] hover:shadow-[#52ffa8]" onClick={grabAdviceData}  >
            <img src="../images/icon-dice.svg" alt="" />
            </div>

        </div>
    )
}

export default AdviceContainer;