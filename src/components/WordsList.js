import { makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        height: "76vh",
        overflowY:"scroll"
    },

    title: {
        flexGrow: 1,
        borderBottom:"2px solid #ccc"
    },
    wordTitle: {
        fontWeight:600
    },
    wordDiv: {
        borderBottom: "2px solid #ccc",
        marginTop: 15,
        padding: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius:5,
        cursor: "pointer",
        transition:"background-color 1000ms linear",
        '&:hover': {
        backgroundColor: "#ccc",
        },
    }
}))

export function WordsList({searchVal}) {
    const words = useSelector(state => state.words)
    const history=useHistory()
    const [wordsList, setWordsList] = useState(null)
    useEffect(() => {
        setWordsList(words)
    }, [words])

    useEffect(() => {
        if (searchVal === "") setWordsList(words)
        else {
            const filterWords = words.filter(word => word?.name.includes(searchVal))
            setWordsList(filterWords)
        }
    }, [searchVal])

    const classes=useStyles()
    return (
        <>
            <Typography className={classes.title} variant="h6" noWrap>
            Words List
            </Typography>
            <div className={classes.root}>
            {
                    wordsList?.sort((a, b) => {
                                            
                        if ( a.name < b.name ){
                            return -1;
                        }
                        if ( a.name > b.name ){
                            return 1;
                        }
                        return 0;

                }).map(word => {
                    return (<div className={classes.wordDiv} key={word.id} onClick={()=>history.push(`/word-details/${word.id}`)}>
                        <Typography className={classes.wordTitle}  variant="h6" noWrap>
                             {word?.name}
                        </Typography>
                        {word.details && <Typography variant="h7" >
                            ({word.details[0]?.partsOfSpeech}) {word.details[0]?.definition[0]}
                        </Typography>}
                    </div>)
                })
                }
                </div>
        </>
    )
}
