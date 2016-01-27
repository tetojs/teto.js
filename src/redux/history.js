import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'

const historyConfig = { basename: __BASENAME__ }

export default useRouterHistory(createHistory)(historyConfig)
