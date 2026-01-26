import * as React from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

    const variantStyles = {
      default:
        'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
      outline:
        'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 active:bg-gray-100',
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
          className || ''
        }`}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-lg border border-gray-200 bg-white shadow-sm ${
        className || ''
      }`}
      {...props}
    />
  )
)

Card.displayName = 'Card'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 ${
        className || ''
      }`}
      {...props}
    />
  )
)

Input.displayName = 'Input'

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: Array<{ value: string; label: string }>
}

export const Select = React.forwardRef<
  HTMLSelectElement,
  SelectProps & { children?: React.ReactNode }
>(({ className, options, ...props }, ref) => (
  <select
    ref={ref}
    className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 ${
      className || ''
    }`}
    {...props}
  >
    {options?.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
    {props.children}
  </select>
))

Select.displayName = 'Select'
