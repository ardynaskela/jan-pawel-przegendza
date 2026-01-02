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
                            className="lg:hidden absolute z-50 w-full h-full flex flex-col gap-4 top-0 bg-zinc-900/20 backdrop-blur-md">

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
                             onClick={() => setIsOpen((prev) => !prev)}
                            className={clsx(
                                  "fixed right-4 bottom-6 sm:right-8 sm:bottom-8 z-50",
                                 "w-fit text-base sm:text-2xl px-5 py-2 rounded-full transition-all duration-300 ease-in-out whitespace-nowrap",
                                  "text-zinc-900 bg-zinc-100 hover:outline-2 outline-offset-2 outline-zinc-100",
                                   )}
                                   >
                                    {isOpen ? "Close" : "Menu"}
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
        "text-6xl sm:text-7xl md:text-8xl",
        "cursor-pointer hover:text-zinc-50/90 transition",
        className
      )}
    >
      {children}
    </motion.a>
  );
}