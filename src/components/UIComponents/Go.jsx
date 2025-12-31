import goWater from "../../assets/watermarks/go.png";
import { motion } from "framer-motion";

export default function Go({ status }) {
  return (
    <>
      {status ? null : (
        <motion.div
          style={{ display: status ? "none" : "" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75 }}
          className="absolute top-[-40px] min-w-[300px] right-[-20px] translate-x-[100%] "
        >
          <img src={goWater} className="opacity-50" alt="" />
        </motion.div>
      )}
    </>
  );
}
