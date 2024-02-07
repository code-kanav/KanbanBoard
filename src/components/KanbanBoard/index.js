import React, { useState, useEffect } from 'react';
import Card from '../Card';
import "./board.css";
import { MdOutlinePendingActions } from "react-icons/md";
import { FcTodoList } from "react-icons/fc";
import { TbProgress , TbUrgent} from "react-icons/tb";
import { LuSignalHigh, LuSignalMedium ,LuSignalLow } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

const KanbanBoard = ({ tickets, users, displayOption, sortOption }) => {
  const [groupedTickets, setGroupedTickets] = useState([]);
  useEffect(() => {
    // Group and sort tickets based on displayOption and sortOption
    const groupAndSortTickets = () => {
      if (!tickets) return [];
      switch (displayOption) {
        case 'status':
          return groupAndSortByStatus(tickets);
        case 'user':
          return groupAndSortByUser(tickets, users);
        case 'priority':
          return groupAndSortByPriority(tickets);
        default:
          return [];
      }
    };

    setGroupedTickets(groupAndSortTickets());
  }, [tickets, users, displayOption, sortOption]);

  const mapPriorityLabel = (priorityLevel) => {
    switch (priorityLevel) {
      case 4:
        return 'Urgent';
      case 3:
        return 'High';
      case 2:
        return 'Medium';
      case 1:
        return 'Low';
      default:
        return 'No priority';
    }
  };

  const getIconForTitle = (title) => {
    switch (title) {
        case 'Todo':
        return <FcTodoList /> 
        case 'In progress':
        return <TbProgress />; 
        case 'Backlog':
        return <MdOutlinePendingActions />; 
        case 'Urgent':
        return <TbUrgent />; 
        case 'High':
        return <LuSignalHigh />; 
        case 'Medium':
        return <LuSignalMedium />; 
        case 'Low':
        return <LuSignalLow />; 
        case 'No priority':
          return <BsThreeDots />; 
      default:
        return <CgProfile />; 
    }
  };

  const groupAndSortByStatus = (tickets) => {
    // Group by status
    const grouped = {};
    tickets.forEach((ticket) => {
      const status = ticket.status;
      if (!grouped[status]) {
        grouped[status] = [];
      }
      grouped[status].push(ticket);
    });

    for (let status in grouped) {
      if (sortOption === "title") {
        grouped[status].sort((a, b) => {
          const titleComparison = a.title.localeCompare(b.title);
          if (titleComparison !== 0) {
            return titleComparison;
          }
        })
      }
      else (
        grouped[status].sort((a, b) => {
          return b.priority - a.priority;
        })
      );
    }

    return Object.keys(grouped).map((key) => ({ title: key, tickets: grouped[key] }));
  };

  const groupAndSortByUser = (tickets, users) => {
    // Group by user
    const grouped = {};
    users.forEach((user) => {
      grouped[user.name] = tickets.filter((ticket) => ticket.userId === user.id);
    });

    for (let user in grouped) {
      if (sortOption === "title") {
        grouped[user].sort((a, b) => {
          const titleComparison = a.title.localeCompare(b.title);
          if (titleComparison !== 0) {
            return titleComparison;
          }
        })
      }
      else (
        grouped[user].sort((a, b) => {
          return b.priority - a.priority;
        })
      );
    }

    return Object.keys(grouped).map((key) => ({ title: key, tickets: grouped[key] }));
  };

  const groupAndSortByPriority = (tickets) => {
    const grouped = {};
    tickets.forEach((ticket) => {
      const priorityLabel = mapPriorityLabel(ticket.priority);
      if (!grouped[priorityLabel]) {
        grouped[priorityLabel] = [];
      }
      grouped[priorityLabel].push(ticket);
    });

    for (let priorityLabel in grouped) {
      if (sortOption === "title") {
        grouped[priorityLabel].sort((a, b) => {
          const titleComparison = a.title.localeCompare(b.title);
          if (titleComparison !== 0) {
            return titleComparison;
          }
        })
      }
      else (
        grouped[priorityLabel].sort((a, b) => {
          return b.priority - a.priority;
        })
      );
    }


    return Object.keys(grouped)
      .sort((a, b) => {
        const priorityOrder = { 'Urgent': 4, 'High': 3, 'Medium': 2, 'Low': 1, 'No priority': 0 };
        return priorityOrder[b] - priorityOrder[a];
      })
      .map((key) => ({ title: key, tickets: grouped[key] }));
  };

  return (
    <div className="kanbanBoard">
      {groupedTickets.map((group, index) => (
        <div key={index} >
          <div className='boardTitle'>
            <div>
              {getIconForTitle(group.title)}
              {group.title} 
            </div>
            <span>
            <FaPlus/> 
            <BsThreeDots />
            </span>
            
          </div>
            <div className="ticketGroup">
            {group.tickets.map((ticket) => (
              <Card key={ticket.id} ticket={ticket} users={users}/>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
