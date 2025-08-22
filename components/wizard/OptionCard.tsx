"use client"
import Image from 'next/image'
import clsx from 'clsx'

type OptionCardProps = {
  title: string
  subtitle?: string
  value: string
  selected?: boolean
  onSelect?: (value: string)=>void
  image?: string
  icon?: React.ReactNode
  size?: 'sm'|'md'|'lg'
}

export function OptionCard({ title, subtitle, value, selected, onSelect, image, icon, size='md' }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={()=> onSelect?.(value)}
      className={clsx(
        'group relative flex flex-col text-start overflow-hidden rounded-2xl border focus-visible:shadow-focus-brand transition shadow-sm bg-white hover:shadow-md motion-reduce:transition-none',
        'active:scale-[0.99] hover:-translate-y-0.5',
        selected && 'ring-2 ring-primary'
      )}
      style={{minHeight: size==='lg'? 220: size==='md'? 170: 140}}
      aria-pressed={selected}
    >
      {image && <Image src={image} alt="" fill className="object-cover opacity-70 group-hover:opacity-80" sizes="(max-width:768px) 50vw, 240px" />}
      <div className={clsx('absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none', image? '':'hidden')} />
      <div className={clsx('relative z-10 p-4 flex flex-col gap-1', image && 'text-white') }>
        <div className="flex items-center gap-2 text-sm font-semibold">
          {icon && <span className="text-lg leading-none" aria-hidden>{icon}</span>}
          <span>{title}</span>
        </div>
        {subtitle && <div className={clsx('text-xs', image? 'text-white/80':'text-textMuted')}>{subtitle}</div>}
      </div>
    </button>
  )
}
