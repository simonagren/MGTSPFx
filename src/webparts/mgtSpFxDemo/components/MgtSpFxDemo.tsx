import * as React from "react";
import { IMgtSpFxDemoProps } from "./IMgtSpFxDemoProps";
import AppContext from "../common/AppContext";
import HelloUser from "./HelloUser";
import Teams from "./Teams";
import Mgt from "./Mgt";
import { useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "mgt-person": any;
      "mgt-people": any;
      "mgt-get": any;
      template: any;
    }
  }
}

const MgtSpFxDemo: React.FunctionComponent<IMgtSpFxDemoProps> = (props) => {
  // State with an empty array
  const [people, setPeople] = useState([]);
  // Handle select on people picker
  const handleSelectionChanged = (e: any) => setPeople(e.target.selectedPeople);

  return (
    // Makes the service available no matter the dept of the component
    <AppContext.Provider value={{ service: props.service }}>
      <div>
        <Mgt type={"people-picker"} onSelectionChanged={handleSelectionChanged} />
        <Mgt type={"people"} people={people} />

        {/* Using the web component */}
        <mgt-person person-query="me" show-name person-card="hover" />

        {/* Component that uses the service */}
        <HelloUser />

        {/* Custom React wrapper */}
        <Mgt
          type="get"
          resource="/me/joinedTeams"
          version="v1.0"
          scopes="user.read.all"
        >
          {/* Imported component */}
          <Teams template="value"></Teams>
        </Mgt>
      </div>
    </AppContext.Provider>
  );
};

export default MgtSpFxDemo;
