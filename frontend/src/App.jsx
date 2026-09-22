import { useEffect, useState } from "react";
// color code for working status of agents
const statusColors = {
  working: "bg-amber-500",
  idle: "bg-gray-500",
  done: "bg-green-500",
  failed: "bg-red-500",
};

//update the latest working status of agents
function getlatestPerAgent(incidents) {
  const latestmap = {};
  incidents.forEach((incident) => {
    const existing = latestmap[incident.agentname];
    if (!existing || new Date(incident.createdAt) > new Date(existing.createdAt)) {
      latestmap[incident.agentname] = incident;

    }
  });

  return Object.values(latestmap);
}






function App() {
  // useeeefect and state to auto update the specific element
  const [incidents, setIncidents] = useState([]);
  useEffect(() => {
    async function apicall() {
      //api fetch from backend
      const url = "http://localhost:3000/api/incidents";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`response status:${response.status}`);
        }
        const result = await response.json();
        setIncidents(result);
        console.log(result);
      }
      catch (error) {
        console.log(error)
      }
    }
    apicall();
  }, [])

  

  return (
    <div className="bg-[#0D0F0E] min-h-screen">


      <div className="grid grid-rows-3 gap-y-5 mt-14 ml-9 grid-cols-[auto-fit(minmax(220px,1fr))]">
        {getlatestPerAgent(incidents).map((incident) => (
          <div
            key={incident._id}
            className={`h-20 w-40 ${statusColors[incident.status]}`}>
              {(incident.agentname)}
        
              
          </div>
        ))
        }

      </div>

    </div>)
}
export default App;
