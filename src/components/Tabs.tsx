import { motion } from "framer-motion"
import tabs from '../data/tabs'
import { useItineraryStore } from '../store/itineraryStore';
function Tabs() {
    const store = useItineraryStore();


    return (
        <>
            <button  className="bg-red-400 p-5 w-10 rounded-2xl">hello</button>
            <button className="bg-red-400 p-5 w-10 rounded-2xl">hello</button>
            </>

    )
}

export default Tabs