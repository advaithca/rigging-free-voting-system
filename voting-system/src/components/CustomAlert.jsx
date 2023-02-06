import React from "react";

const CustomAlert = (props) => {
  if (props.ifAlertSuccess) {
    return (<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
      {props.message}
    </div>);
  } else {
    return (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {props.message}
    </div>);
  }
}

export default CustomAlert;