import enterWater from "../../assets/watermarks/enter.png";
import arrayWater from "../../assets/watermarks/array.png";

import { motion } from "framer-motion";

export default function EnterArray({ status }) {
  return (
    <>
      {status ? null : (
        <motion.div
          style={{ display: status ? "none" : "" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75 }}
          className="absolute top-[-10px] min-w-[500px] right-[70%] translate-y-[-100%]"
        >
          <img src={enterWater} className="opacity-50" alt="" />
        </motion.div>
      )}

      {status ? null : (
        <motion.div
          style={{ display: status ? "none" : "" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75 }}
          className="absolute bottom-[-25px] scale-[135%] left-[50px] translate-x-[-100%] translate-y-[100%]"
        >
          <img src={arrayWater} className="opacity-50" alt="" />
        </motion.div>
      )}
    </>
  );
}
