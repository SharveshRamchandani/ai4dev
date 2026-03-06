import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface DockProps {
  className?: string
  items: {
    icon: LucideIcon
    label: string
    onClick?: () => void
    active?: boolean
  }[]
}

interface DockIconButtonProps {
  icon: LucideIcon
  label: string
  onClick?: () => void
  active?: boolean
  className?: string
}

const DockIconButton = React.forwardRef<HTMLButtonElement, DockIconButtonProps>(
  ({ icon: Icon, label, onClick, active, className }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.15, y: -4 }}
        onClick={onClick}
        className={cn(
          "relative flex flex-col items-center justify-center gap-0.5 p-2 rounded-xl transition-colors",
          active ? "text-foreground" : "text-muted-foreground",
          className
        )}
      >
        <Icon className="w-5 h-5" />
        <span className="text-[10px] font-medium leading-none">{label}</span>
        {active && (
          <motion.div
            layoutId="dock-active"
            className="absolute -bottom-1 w-1 h-1 rounded-full bg-foreground"
          />
        )}
      </motion.button>
    )
  }
)
DockIconButton.displayName = "DockIconButton"

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ items, className }, ref) => {
    return (
      <div ref={ref} className={cn("fixed bottom-0 left-0 right-0 z-40 pb-safe", className)}>
        <div className="mx-3 mb-3">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-around rounded-2xl border border-border bg-background/80 backdrop-blur-xl px-2 py-1.5 shadow-lg"
          >
            {items.map((item) => (
              <DockIconButton key={item.label} {...item} />
            ))}
          </motion.div>
        </div>
      </div>
    )
  }
)
Dock.displayName = "Dock"

export { Dock }
