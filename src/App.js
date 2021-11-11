import Table from "./Table";
import React, { Profiler } from 'react';
import ReactDOM from 'react-dom';

function App() {

    const onRenderCallback = (
        id, // the "id" prop of the Profiler tree that has just committed
        phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
        actualDuration, // time spent rendering the committed update
        baseDuration, // estimated time to render the entire subtree without memoization
        startTime, // when React began rendering this update
        commitTime, // when React committed this update
        interactions // the Set of interactions belonging to this update
      ) => {
        // Aggregate or log render timings...
        console.log(
          'Phase is', phase,
          'Duration is', actualDuration,
          'Start time is', startTime, 
          'Commit Time is', commitTime,
          'Base time w/o Memoization is', baseDuration
        )
      }
    

    return (
        <Profiler id="Table" onRender={onRenderCallback}>
            <Table />
        </Profiler>
    )
}

export default App;

