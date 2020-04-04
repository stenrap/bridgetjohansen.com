import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './ui/pages/home/App'
import store from './ui/store/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
