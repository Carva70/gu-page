import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

export default function Fragment() {
    const validTextColor = "text-light"
    const errorTextColor = "text-danger"
    const [deck, setDeck] = useState([...Array(10)].map(() => ([false, "Mythic", 0, 0, 0, 30, 0])))
    const [total, setTotal] = useState(0)
    const [daily, setDaily] = useState(14)
    const [comFragments, setComFragments] = useState(3.21)
    const [reward, setReward] = useState(0)
    const [rowColor, setRowColor] = useState([...Array(10)].map(() => (validTextColor.slice())))

    var headerList = ["Game", "Wins", "Rank", "Diamond Cards", "Gold Cards", "Shadow Cards", "Meteorite Cards", "Fragments"]
    var headerRow = []
    var data = {
        "Mythic": 0.915,
        "Ethereal Diamond": 0.745,
        "Solar Gold": 0.575,
        "Auric Gold": 0.405,
        "Midnight Shadow": 0.235,
        "Twilight Shadow": 0.14,
        "Astral Meteorite": 0.125,
        "Impact Meteorite": 0.11,
        "Purified Iron": 0.095,
        "Rusted Iron": 0.08,
        "Purified Bronze": 0.065,
        "Rusted Bronze": 0.05
    }
    var ranks = Object.keys(data)

    for (var i in headerList) {
        headerRow.push(<th key={i}>{headerList[i]}</th>)
    }

    function handlerSelect(e) {
        var copyDeck = deck.slice()
        var i = e.target.id.slice(4, e.target.id.length)
        copyDeck[i][1] = e.target.value
        setDeck(copyDeck)
        handler()
    }

    function handlerCheckbox(e) {
        var copyDeck = deck.slice()
        var i = e.target.id.slice(3, e.target.id.length)
        copyDeck[i][0] = e.target.checked
        setDeck(copyDeck)
        handler()
    }

    function handlerNumber(e, j) {
        var copyDeck = deck.slice()
        var i = e.target.id.slice(4, e.target.id.length)
        copyDeck[i][j] = parseInt(e.target.value)
        setDeck(copyDeck)
        handler()
    }
        
    function handler() {
        var copyDeck = deck.slice()
        var copyRowColor = rowColor.slice()
        for (var i = 0; i < 10; i++) {
            const [win, rank, diamond, gold, shadow, meteorite, fragment] = copyDeck[i]
            var result = 0
            

            if (((diamond + gold + shadow + meteorite) > 30) || (diamond < 0) || (gold < 0) || (shadow < 0) || (meteorite < 0)) {
                copyRowColor[i] = errorTextColor.slice()
                setRowColor(copyRowColor)
                return
            }
            

            if(win == true) {

                var rankValue = data[rank]
                var winStreak = 0
                if (i > 0) { if (win && deck[i - 1][0]) {winStreak = 0.09}}
        
                var cardValue = (diamond * 125 + gold * 25 + shadow * 5 + meteorite) / 3750
        
                var minQualityBoost
        
                if ((diamond + gold + shadow + meteorite) < 30) minQualityBoost = 0
                else if (diamond == 30) minQualityBoost = 1
                else if ((diamond + gold) == 30) minQualityBoost = 0.25
                else if ((diamond + gold + shadow) == 30) minQualityBoost = 0.2
                else if ((diamond + gold + shadow + meteorite) == 30) minQualityBoost = 0.15
        
                var deckTotal = (cardValue * (1 - minQualityBoost)) +  minQualityBoost
                
                var resultList = copyDeck.map((x) => (x[6]))

                if (i < 3) {
                    result = 100 * (rankValue + winStreak + deckTotal) * 2
                } else {
                    var countH = resultList.slice(0, i).filter(value => value > 0).length;
                    result = 100 * (rankValue + winStreak + deckTotal) * (countH >= 3 ? 1 : 2)
                }
            }
            copyRowColor[i] = validTextColor.slice()
            copyDeck[i] = [win, rank, diamond, gold, shadow, meteorite, result].slice()
        }
        setRowColor(copyRowColor)
        setDeck(copyDeck)
        var totalFragments = copyDeck.map((x) => x[6]).reduce((x, y) => (x + y), 0)
        setTotal(totalFragments)
        setReward((totalFragments * daily * 1000) / (comFragments * 1000000))

    }

    var rows = []
    for (var i = 0; i < 10; i++) {
        rows.push(
            <tr key={i}>
                <td key={1}>{i + 1}</td>
                <td key={2} className="text-center"><Form.Check id={"win" + i} checked={deck[i][0]} onChange={(e) => handlerCheckbox(e)} inline /></td>
                <td key={3}>
                    <Form.Select size='sm' className='bg-dark' style={{color: "white", border: "0px"}} id={"rank" + i} key={i} value={deck[i][1]} onChange={(e) => {handlerSelect(e)}}>
                        {ranks.map((e) => (<option key={e}>{e}</option>))}
                    </Form.Select>
                </td>
                <td key={4}>
                    <Form.Control value={deck[i][2]} type='number' size='sm' className={'bg-dark ' + rowColor[i]} style={{color: "white", border: "0px"}} id={"diam" + i} onChange={(e) => {handlerNumber(e, 2)}}></Form.Control>
                </td>
                <td key={5}>
                    <Form.Control value={deck[i][3]} type='number' size='sm' className={'bg-dark ' + rowColor[i]} style={{color: "white", border: "0px"}} id={"gold" + i} onChange={(e) => {handlerNumber(e, 3)}}></Form.Control>
                </td>
                <td key={6}>
                    <Form.Control value={deck[i][4]} type='number' size='sm' className={'bg-dark ' + rowColor[i]} style={{color: "white", border: "0px"}} id={"shad" + i} onChange={(e) => {handlerNumber(e, 4)}}></Form.Control>
                </td>
                <td key={7}>
                    <Form.Control value={deck[i][5]} type='number' size='sm' className={'bg-dark ' + rowColor[i]} style={{color: "white", border: "0px"}} id={"mete" + i} onChange={(e) => {handlerNumber(e, 5)}}></Form.Control>
                </td>
                <td key={8}>
                    <div>{(deck[i][6] == 0) ? "-" : deck[i][6].toFixed(4)}</div>
                </td>
            </tr>
        )
    }

    rows.push(
        <tr key={10}>
            <td key={1} colSpan={6}></td>
            <th>Total Fragments</th>
            <td key={2}><div>{total.toFixed(4)}</div></td>
        </tr>
    )
    rows.push(
        <tr key={11}>
            <td key={1} colSpan={6}></td>
            <th>Daily GODS (K)</th>
            <td key={2}><div><Form.Control value={daily} type='number' size='sm' className={'bg-dark ' + validTextColor} style={{color: "white", border: "0px"}} id="daily" onChange={(e) => {setDaily(parseFloat(e.target.value))}}></Form.Control></div></td>
        </tr>
    )
    rows.push(
        <tr key={12}>
            <td key={1} colSpan={6}></td>
            <th>Comm. Fragments (M)</th>
            <td key={2}><div><Form.Control value={comFragments} type='number' size='sm' className={'bg-dark ' + validTextColor} style={{color: "white", border: "0px"}} id="daily" onChange={(e) => {setComFragments(parseFloat(e.target.value))}}></Form.Control></div></td>
        </tr>
    )
    rows.push(
        <tr key={13}>
            <td key={1} colSpan={6}></td>
            <th>Daily Rewards</th>
            <td key={2}><div>{reward.toFixed(4)}</div></td>
        </tr>
    )

    return (
        <Container className='mt-4'>
            <Table responsive bordered hover variant="dark">
                <thead>
                    <tr>
                        {headerRow}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </Container>
    )
}