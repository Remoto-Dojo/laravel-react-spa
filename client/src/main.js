import React from "react";
import ReactDOM from "react-dom";
import Main from "@/components/Main";
import  "./style.scss";
import CsvData from "./mycsv.csv";

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

ReactDOM.render(<Main/>, document.getElementById('app'));

if (module.hot) { // enables hot module replacement if plugin is installed
  module.hot.accept();
}

console.log(CsvData);
