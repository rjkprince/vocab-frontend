import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { GRAPH_API } from './constants';

import { HomePage } from "./pages/HomePage"
import { WordDetails } from "./pages/WordDetails"

const fetchAllWords = {
  query: `
  {
    words{
        id
        name
        details {
            partsOfSpeech
            origin
            definition
            examples
        }
    }
  }
  `
}

export default function App() {
  const dispatch = useDispatch()
    useEffect(() => {
      axios({
   url: GRAPH_API,
   method: 'post',
   data: fetchAllWords
  })
        .then(res => {
          console.log(res.data)
           if (res.data.errors && res.data.errors.length > 0) {
                let errorMsg = ""
                res.data.errors.forEach(err => errorMsg += err.message + "\n")
                alert(errorMsg)
                return;
          }
          dispatch({ type: "SET_WORDS", payload: res.data.data.words })
   })
    }, [])
  return (
     <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/word-details/:id">
            <WordDetails />
          </Route>
        </Switch>
    </Router>
  )
}
