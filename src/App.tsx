import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { appTheme } from './theme';
import ContactList from './page/contact_list';
import ContacForm from './page/contact_form';
import MainApp from './page/main';
import { clientApollo } from './graphql/graphql';
import { ApolloProvider } from '@apollo/client'
import { FavoriteProvider } from './utils/context/favoriteContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <ApolloProvider client={clientApollo}>
      <FavoriteProvider >
        <MainApp />
      </FavoriteProvider>
    </ApolloProvider>
  )
}

export default App
