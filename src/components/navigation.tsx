import clsx from "clsx/lite";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Navigation({ children }: { children: React.ReactNode; }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex items-center justify-center gap-12">

            <AnimatePresence>
                {isOpen &&
                    <>
                        <motion.div
                            initial={{ filter: "blur(20px)", opacity: 0 }}
                            transition={{ ease: "easeInOut", duration: 0.5 }}
                            animate={{ filter: "blur(0px)", opacity: 1 }}
                            exit={{ filter: "blur(20px)", opacity: 0 }}
                            className="hidden lg:flex gap-4">
                            {children}
                        </motion.div>

                        <motion.dialog
                            open={isOpen}
                            initial={{ filter: "blur(20px)", opacity: 0 }}
                            transition={{ ease: "easeInOut", duration: 0.25 }}
                            animate={{ filter: "blur(0px)", opacity: 1 }}
                            exit={{ filter: "blur(20px)", opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden absolute z-50 w-full h-full flex flex-col gap-4 top-0 bg-gray-950/20 backdrop-blur-md">

                            <div className="fixed top-20 sm:top-28 left-4 sm:left-8 flex flex-col items-start justify-start gap-6">
                                <MobileLink href="/works"> Works </MobileLink>
                                <MobileLink href="/about"> About </MobileLink>
                                <MobileLink href="/events"> Events </MobileLink>
                                <MobileLink href="/news"> News </MobileLink>
                                <MobileLink href="/photos"> Photos </MobileLink>
                                <MobileLink href="/media"> Media </MobileLink>
                                <MobileLink href="/contact"> Contact </MobileLink>

                            </div>
                        </motion.dialog>
                    </>
                }
            </AnimatePresence>

<motion.button
  type="button"
  aria-label={isOpen ? "Close menu" : "Open menu"}
  aria-expanded={isOpen}
  onClick={() => setIsOpen((prev) => !prev)}
  className={clsx(
    "fixed right-4 bottom-6 sm:right-8 sm:bottom-8 z-50",
    "w-12 h-12 sm:w-14 sm:h-14 rounded-full",
    "grid place-items-center",
    "text-gray-950 bg-gray-100 hover:outline-2 outline-offset-2 outline-gray-100",
    "transition-all duration-300 ease-in-out"
  )}
>
  <motion.svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    initial={false}
    animate={isOpen ? "open" : "closed"}
  >
    {/* top */}
    <motion.path
      d="M4 7H20"
      variants={{
        closed: { rotate: 0, translateY: 0 },
        open: { rotate: 45, translateY: 5 },
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ transformOrigin: "12px 12px" }}
    />
    {/* middle */}
    <motion.path
      d="M4 12H20"
      variants={{
        closed: { opacity: 1 },
        open: { opacity: 0 },
      }}
      transition={{ duration: 0.15 }}
    />
    {/* bottom */}
    <motion.path
      d="M4 17H20"
      variants={{
        closed: { rotate: 0, translateY: 0 },
        open: { rotate: -45, translateY: -5 },
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ transformOrigin: "12px 12px" }}
    />
  </motion.svg>
</motion.button>
        </div>
    );
}

type MobileLinkProps = {
    href: string;
    className?: string;
    children: React.ReactNode;
};

function MobileLink({ href, className, children }: MobileLinkProps) {
  return (
    <motion.a
      href={href}
      initial={{ transform: "translateY(100px)", filter: "blur(20px)", opacity: 0 }}
      transition={{ type: "spring", stiffness: 25, damping: 2, mass: 0.1 }}
      animate={{ transform: "translateY(0px)", filter: "blur(0px)", opacity: 1 }}
      exit={{ transform: "translateY(100px)", filter: "blur(20px)", opacity: 0 }}
      className={clsx(
        "w-fit font-bold text-white tracking-tight leading-none",
        "text-5xl sm:text-6xl md:text-7xl",
        "cursor-pointer hover:text-gray-50/90 transition",
        className
      )}
    >
      {children}
    </motion.a>
  );
}