import { Fab, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Header} from "../components/Header"
import { NewWordDialog } from '../components/NewWordDialog';
import { WordsList } from '../components/WordsList';
import { GRAPH_API } from '../constants';

const useStyles = makeStyles((theme)=>({
  rootDiv: {
      backgroundColor: "#640066",
        width: "80%",
        margin: "auto",
        marginTop: 40,
        position: "relative",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            marginTop: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
    },
      
    },
    childDiv: {
        backgroundColor: "#fff",
        width: "100%",
        position: "absolute",
        top: 60,
        padding:20,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        boxShadow: "0 3px 6px #640066",
        boxSizing:"border-box"
    },
    addBtn: {
        position: "absolute",
        right: 10,
        bottom: 10,
        backgroundColor: "#640066",
        color: "#fff",
        
    }
}));

const createNewWord =(name)=> ({
  query: `mutation createWord($input: CreateWordInput!) {
    createWord(input: $input){
        id
        name
        details {
            partsOfSpeech
            origin
            definition
            examples
        }
    }
  }`,
  variables: {
  "input": {
    "name": name
  }
}
})

export function HomePage() {
    const [searchVal, setSearchVal] = useState("")
    const [open, setOpen] = React.useState(false);
    const [inputVal, setInputVal] = useState("")
    const words = useSelector(state => state.words)
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setInputVal("")
    };

    const handleSubmit = (input) => {
        axios({
            url: GRAPH_API,
            method: 'post',
            data: createNewWord(input)
        })
        .then(res => {
            const copyWords = JSON.parse(JSON.stringify(words))
            copyWords.push(res.data.data.createWord)
            dispatch({type:"SET_WORDS",payload:copyWords})
        })
        .catch(err => {
            console.log(err.message);
        })
            .finally(() => {
              handleClose()
        })
      
    };
    const classes=useStyles()
    return (
        <div className={classes.rootDiv} >
           <Header searchVal={searchVal} setSearchVal={setSearchVal} />
            <div className={classes.childDiv}>
                <WordsList searchVal={searchVal} />
                <Fab  aria-label="add" className={classes.addBtn} onClick={handleClickOpen}>
                    <Add />
                </Fab>
            </div>
            <NewWordDialog open={open} handleClose={handleClose} handleSubmit={handleSubmit} inputVal={inputVal} setInputVal={setInputVal} />
        </div>
    )
}
