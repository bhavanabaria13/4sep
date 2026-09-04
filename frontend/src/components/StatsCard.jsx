import { motion } from "framer-motion";

export default function StatCard({
    icon: Icon,
    value,
    title
}) {
    return (
        <motion.div
            whileHover={{
                y: -4,
                backgroundColor: "rgba(12,18,35,.95)"
            }}
            transition={{ duration: .25 }}
            className="group relative flex items-center gap-4 px-8 py-6"
        >
            {/* Divider */}
            <div className="absolute right-0 top-6 bottom-6 w-px bg-cyan-500/20 last:hidden"></div>

            {/* Icon */}
            <div  style={{  padding: "10px",
    height: "50px"}} 
                className="
                h-14
                w-14
               
                flex
                items-center
                justify-center
                rounded-2xl
      border border-white/20
      bg-white/10
      backdrop-blur-xl
      shadow-lg
                
                group-hover:shadow-[0_0_30px_rgba(0,255,255,.35)]
                transition
                "
            >
                <Icon
                    size={28}
                    className="text-cyan-300"
                />
            </div>

            {/* Text */}
            <div>
                <h4 style={{ fontSize: "18px" } }
                    className="
                    text-5xl
                    font-black
                    leading-none
                    bg-gradient-to-r
                    from-cyan-300
                    via-cyan-400
                    to-sky-400
                    bg-clip-text
                    text-transparent
                    "
                >
                    {value}
                </h4>

                <p  style={{ fontSize: "15px" } } className="mt-2 text-white text-lg font-medium">
                    {title}
                </p>
            </div>
        </motion.div>
    );
}