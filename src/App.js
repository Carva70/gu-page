import React, { useEffect } from "react";
import _nav from "./_nav";
import Fragment from "./Fragment";
import Payback from "./Payback";
import Search from "./Search";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from "react";
import axios from 'axios'
import 'bootstrap'

function App() {
    const [price, setPrice] = useState(0)
    const [page, setPage] = useState("fragment")

    const displayPage = {"fragment": showFragment, "payback": showPayback, "search": showSearch}
    
    function showFragment() {
        return(<Fragment />)
    }

    function showPayback() {
        return(<Payback />)
    }

    function showSearch() {
        return(<Search />)
    }

    var pageurl = "https://api.coingecko.com/api/v3/simple/price?ids=gods-unchained&vs_currencies=USD&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=18"

    useEffect(() => {
        axios.get(pageurl)
        .then(res => {
            setPrice(res.data["gods-unchained"]["usd"])
        })
    }, [pageurl])

    function handler(name) {
        setPage(name)
    }

    return (
        <div>
            <_nav price={price.toFixed(6)} handler={handler} />
            <div>{displayPage[page]()}</div>
        </div>
    );
}

export default App;