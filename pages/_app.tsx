import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import '../ui/styles/global.scss'
import store from '../store/store'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
