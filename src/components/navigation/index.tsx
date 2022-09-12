import { useToggle } from '../../utils/hooks'
import Drawer from './Drawer'
import TitleBar from './TitleNav'

export type NavProps = {
  showDrawer: boolean
  toggle: (x?: boolean) => void
}
const Navigation = () => {
  const [showDrawer, setShowDrawer] = useToggle(false)

  return (
    <nav className="w-screen flex justift-between items-center shadow-lg h-12 bg-navy-600 dark:bg-navy-500">
      <TitleBar showDrawer={showDrawer} toggle={setShowDrawer} />
      <Drawer showDrawer={showDrawer} toggle={setShowDrawer} />
    </nav>
  )
}

export default Navigation
