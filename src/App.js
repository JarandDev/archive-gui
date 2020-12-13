import React, {useEffect} from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Archives from "./components/Archives";
import {useTranslation} from "react-i18next";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import BreadBags from "./components/bread-bags/BreadBags";
import BreadBagsSettings from "./components/bread-bags-settings/BreadBagsSettings";
import AppMenu from "./components/AppMenu";
import Cookies from "js-cookie";

function App() {
    const [user, setUser] = React.useState({});
    const {t, i18n} = useTranslation("common");

    const handleLanguageChange = event => {
        i18n.changeLanguage(event.target.value);
    };

    useEffect(() => {
        const email = Cookies.get("email");
        const scope = Cookies.get("scope");
        if (email && scope) {
            setUser({
                email: email,
                scopes: [scope],
                loggedIn: true
            });
        }

    }, []);

    return (
        <div className="App">
            <Router>
                <AppMenu user={user}/>
                <Switch>
                    <Route exact path="/" render={props => (<Archives user={user} {...props}/>)}/>
                    <Route exact path="/bread-bags" render={props => (<BreadBags {...props}/>)}/>
                    <Route exact path="/settings/bread-bags"
                           render={props => (<BreadBagsSettings user={user} {...props}/>)}/>
                </Switch>
                <FormControl>
                    <InputLabel id="language-label">Language</InputLabel>
                    <Select labelId="language-label" id="language-select"
                            value={i18n.language} onChange={handleLanguageChange}>
                        <MenuItem value="no">Norsk</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                    </Select>
                </FormControl>
                <p>{t("title")} 0.1.0</p>
            </Router>
        </div>
    );
}

export default App;
