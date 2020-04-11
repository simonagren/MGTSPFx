import * as React from 'react';
import styles from "./MgtSpFxDemo.module.scss";
import Mgt from "./Mgt";

const Teams: React.FunctionComponent<any> = (team) => {
  return (
    <>
      <h3>{team.displayName}</h3>
      <div className={styles.description}>
        {team.description ? team.description : "Team description is empty"}
      </div>
      <h4>
        <Mgt type="people" group-id={team.id} />
      </h4>
    </>
  );
};

export default Teams;
