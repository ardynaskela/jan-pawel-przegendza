import clsx from "clsx/lite";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type NavItem = { href: string; label: string };

export default function Navigation({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <AnimatePresence>
        {isOpen && (
          <motion.dialog
            open
            initial={{ filter: "blur(20px)", opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.25 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            exit={{ filter: "blur(20px)", opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 w-full h-full flex flex-col gap-4 bg-neutral-950/20 backdrop-blur-md"
          >
            <div
              className="fixed top-20 sm:top-28 left-4 sm:left-8 flex flex-col items-start justify-start gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {items.map((item) => (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </motion.dialog>
        )}
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
          "text-neutral-950 bg-neutral-100 hover:outline-2 outline-offset-2 outline-neutral-100",
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
  onClick?: () => void;
};

function MobileLink({ href, className, children, onClick }: MobileLinkProps) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      initial={{
        transform: "translateY(100px)",
        filter: "blur(20px)",
        opacity: 0,
      }}
      transition={{ type: "spring", stiffness: 25, damping: 2, mass: 0.1 }}
      animate={{
        transform: "translateY(0px)",
        filter: "blur(0px)",
        opacity: 1,
      }}
      exit={{
        transform: "translateY(100px)",
        filter: "blur(20px)",
        opacity: 0,
      }}
      className={clsx(
        "w-fit font-bold text-white tracking-tight leading-none",
        "text-5xl sm:text-6xl md:text-7xl",
        "cursor-pointer hover:text-neutral-50/90 transition",
        className
      )}
    >
      {children}
    </motion.a>
  );
}