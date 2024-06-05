import React from 'react';
import './../styles/Tabs.scss';

interface TabsProps {
  activeTab: string;
  tabs: string[];
  onTabClick: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, tabs, onTabClick }) => {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`tabs__tab ${tab === activeTab ? 'active' : ''}`}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
