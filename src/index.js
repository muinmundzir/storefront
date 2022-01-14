import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import { fetchItems } from './redux/Shopping/shopping-reducer'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './index.css'
import App from './App'
import Layout from './layouts/Layout'
import DetailItem from './components/Items/DetailItem'
import Cart from './Cart'

store.dispatch(fetchItems)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/product/:id" element={<DetailItem />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <ToastContainer />
      </Layout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
