import orderWater from "../../assets/watermarks/search.png";
import { motion } from "framer-motion";

export default function SearchNode({ status }) {
  return (
    <>
      {status ? null : (
        <motion.div
          style={{ display: status ? "none" : "" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75 }}
          className="absolute bottom-[-20px] right-[40%] min-w-[270px]  translate-y-[100%]"
        >
          <img src={orderWater} className="opacity-50" alt="" />
        </motion.div>
      )}
    </>
  );
}
