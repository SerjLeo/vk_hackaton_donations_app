import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import './style.css'
import './vkui_custom.css'
import {HashRouter as Router} from 'react-router-dom'

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(<App className="app" />, document.getElementById("root"));
