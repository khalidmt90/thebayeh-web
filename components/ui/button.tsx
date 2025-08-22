"use client"
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

// Minimal cn util (avoid importing legacy app utils now)
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:shadow-focus-brand active:translate-y-[1px] active:scale-[0.985]',
  {
    variants: {
      variant: {
        default: 'bg-primary text-black hover:brightness-105',
        brand: 'bg-primary text-black hover:brightness-105',
        outline: 'border border-border bg-white text-text hover:bg-backgroundAlt',
        ghost: 'text-text hover:bg-backgroundAlt',
        black: 'bg-black text-white hover:bg-black/90',
        link: 'text-primary underline underline-offset-4 hover:opacity-85'
      },
      size: {
        default: 'h-12 px-5 py-2',
        sm: 'h-10 rounded-md px-4',
        lg: 'h-14 rounded-xl px-10',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: { variant: 'default', size: 'default' }
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), 'hover:translate-y-[-2px] hover:scale-[1.01]', className)} aria-busy={loading || undefined} {...props}>
        {loading && (
          <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.15" />
            <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        )}
        {props.children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'
