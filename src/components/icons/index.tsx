export interface IconProps {
  className?: string
  clickHandler?: () => void
}
interface IconHOCProps extends IconProps {
  children: React.ReactNode
  size?: string
}
export const Icon: React.FC<IconHOCProps> = ({
  children,
  clickHandler,
  className,
  size,
}) => (
  <svg
    onClick={() => clickHandler && clickHandler()}
    xmlns='http://www.w3.org/2000/svg'
    className={`${className != null ? className : 'h-6 w-6'}`}
    fill='none'
    viewBox={size != null ? size : '0 0 24 24'}
    stroke='currentColor'
    strokeWidth='2'
  >
    {children}
  </svg>
)
export const DashboardIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    />
  </Icon>
)
export const MenuIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M4 6h16M4 12h16M4 18h16'
    />
  </Icon>
)
export const MenuIndicatorIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M10 19l-7-7m0 0l7-7m-7 7h18'
    />
  </Icon>
)

export const LogoPlaceholderIcon: React.FC<IconProps> = (props) => (
  <Icon {...props} size='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
    />
  </Icon>
)
export const SubMenuIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
  </Icon>
)
export const PagesIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
    />
  </Icon>
)
export const MediaIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
    />
  </Icon>
)
export const ProjectsIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
    />
  </Icon>
)
export const AnalyticsIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
    />
  </Icon>
)
export const InboxIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
    />
  </Icon>
)
export const ProfileIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    />
  </Icon>
)
export const SettingsIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    />
  </Icon>
)
export const LogoutIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
    />
  </Icon>
)
