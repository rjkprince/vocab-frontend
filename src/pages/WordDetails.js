import { makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';



const useStyles = makeStyles((theme)=>({
  rootDiv: {
     height: "100vh",
        padding: 20,
         overflowY:"scroll",
      width: "80%",
        margin: "auto",
        boxSizing:"border-box",
        marginTop: 40,
        boxShadow: "0 3px 6px #640066",
          [theme.breakpoints.down('sm')]: {
            width: "100%",
            marginTop: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
    },
    },

     wordTitle: {
        fontWeight:600
    },
    partsOfSpeech: {
         color:"#67707D"
    },
    origin: {
        color:"#A3AAB2"
    },

        wordDiv: {
        borderBottom: "2px solid #ccc",
        marginTop: 15,
        padding: 10,
    }
    


}));



export function WordDetails() {
    const { id } = useParams()
    const [word, setWord] = useState(null)
    const words = useSelector(state => state.words)

    useEffect(() => {
        const theWord = words?.find(word => word.id === id)
        setWord(theWord)
    }, [words])

    console.log(word)

    const classes=useStyles()
    return (
        <div className={classes.rootDiv} >
            <Typography className={classes.wordTitle}  variant="h2" noWrap>
                            {word?.name}
            </Typography>
            {
                word?.details?.map(det => {
                    return (<div className={classes.wordDiv}>
                         <Typography className={classes.partsOfSpeech}  variant="h6" noWrap>
                            {det?.partsOfSpeech}
                        </Typography>
                        
                        {det?.origin.map(o => <Typography className={classes.origin} variant="h6" >Origin: {o}</Typography>)}
                        {det?.definition.map(def => <Typography  variant="h6" >{def}</Typography>)}
                        <ul>{det?.examples.map(ex => <li><Typography  variant="h7" >{ex}</Typography></li>)}</ul>
                         
                    </div>)
                })
            }
           
        </div>
    )
}
