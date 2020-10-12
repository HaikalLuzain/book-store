export interface RouteType {
  path: string
  pathTo?: string
  name: string
  component?: React.FC<any>
  exact?: boolean
  icon?: string
  redirect?: boolean
  isSidebar?: boolean
}
